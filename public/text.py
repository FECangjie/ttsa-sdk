import time
import grpc
import requests
import traceback
import xml.etree.ElementTree as ET
from urllib.parse import urljoin
from contextlib import ExitStack

from django.conf import settings
from django.db import transaction
from django.core.cache import cache
from rest_framework.response import Response
from common_rest.views import CustomizedAPIView, expose

from .models import JanusRoom, UserJanusRoom, JanusServer, JanusRoomRecoder, ServerRoomId
from . import models, serializers, filters, ttsa_proxy, webrtc_to_rtp_rtmp_pb2, webrtc_to_rtp_rtmp_pb2_grpc
from .utils import get_ttsa_info, init_offline_room, cleanse_dirty_data_janus_room_recorder
from .extra_modes import WTRRMode, TRTCMode
from .room_caches import get_room_cache, set_room_cache

import logging

logger = logging.getLogger("kibana.logger")
API_GATEWAY_URL = getattr(settings, 'API_GATEWAY_URL', '')


class ServerRoomIdView(CustomizedAPIView):
    model = ServerRoomId
    serializer_class = serializers.ServerRoomIdSerializer
    lookup_field = 'id'

    def get(self, request):
        return self._i_get(request)

    def post(self, request):
        room_ip = request.data.get('room_ip')
        room_port = request.data.get('room_port')
        last_room = ServerRoomId.objects.last()
        if last_room is None:
            room_id = 50000
        else:
            room_id = int(last_room.room_id) + 1
        obj, _ = ServerRoomId.objects.get_or_create(room_ip=room_ip, room_port=room_port, defaults={
            'room_id': room_id,
        })

        return Response({'error_code': 0, 'error_reason': '', 'data': {
            'room_ip': room_ip,
            'room_port': room_port,
            'room_id': obj.room_id,
        }})


class JanusRoomRecoderView(CustomizedAPIView):
    model = JanusRoomRecoder
    serializer_class = serializers.JanusRoomRecoderSerializer
    filter_class = filters.JanusRoomRecoderFilter
    lookup_field = 'id'

    def get(self, request):
        return self._i_list(request)


class RoomStatusView(CustomizedAPIView):

    def get(self, request):
        room_id = request.query_params.get('room_id')
        cache_key = 'room_%s_status' % room_id
        room_status = get_room_cache(cache_key) or 'not_in_cache'
        cache_key = 'room_%s_ue4_resp_timestamp' % room_id
        ue4_resp_timestamp = get_room_cache(cache_key) or -1
        cache_key = 'room_%s_ttsa_resp_timestamp' % room_id
        ttsa_resp_timestamp = get_room_cache(cache_key) or -1
        return Response({'error_code': 0, 'error_reason': '', 'data': {
            'room_id': room_id,
            'room_status': room_status,
            'ue4_resp_timestamp': ue4_resp_timestamp,
            'ttsa_resp_timestamp': ttsa_resp_timestamp,
        }})

    def post(self, request):
        ts = request.data['ts']
        room_id = request.data['room_id']
        room_status = request.data['room_status']
        ue4_resp_timestamp = request.data['ue4_resp_timestamp']
        ttsa_resp_timestamp = request.data['ttsa_resp_timestamp']

        now_ts = int(time.time())
        if now_ts - ts > 5:
            return Response({'error_code': 1, 'error_reason': 'not fresh data'})

        cache_key = 'room_%s_status' % room_id
        set_room_cache(cache_key, room_status, 5)
        cache_key = 'room_%s_ue4_resp_timestamp' % room_id
        set_room_cache(cache_key, ue4_resp_timestamp, 5)
        cache_key = 'room_%s_ttsa_resp_timestamp' % room_id
        set_room_cache(cache_key, ttsa_resp_timestamp, 5)
        return Response({'error_code': 0, 'error_reason': 'ok'})


class VerifyView(CustomizedAPIView):

    @expose(['POST'])
    def verify(self, request):
        user_id = request.data['user_id']
        token_key = request.data['key']
        room_id = request.data['room_id']
        if models.UserRoom.objects.filter(user_id=user_id, key=token_key, room_id=room_id).exists():
            return Response({'error_code': 0, 'error_reason': ''})
        return Response({'error_code': 1, 'error_reason': ''})

    @expose(["GET"])
    @transaction.atomic
    def acquire(self, request):
        with ExitStack() as stack:
            if settings.USE_OPEN_ROOM_LOCK:
                stack.enter_context(cache.lock(key=settings.OPENROOM_LOCK, timeout=10, sleep=0.05))
            user_id = int(request.query_params.get('user_id'))
            userroom_qs = models.UserRoom.objects.filter(user_id=user_id)
            userjanusroom_qs = models.UserJanusRoom.objects.filter(user_id=user_id)
            user_server_obj = userroom_qs.first() or userjanusroom_qs.first()
            if not user_server_obj:
                return Response({'error_code': 1, 'error_reason': 'the user server relation does not exist'})
            worker_qs = models.UE4Worker.objects.exclude(
                userroom__in=models.UserRoom.objects.all()).exclude(
                userjanusroom__in=models.UserJanusRoom.objects.all()).filter(
                tag_id=user_server_obj.tag_id)
            logger.info('user {} get queryset {}'.format(user_id, worker_qs))
            for worker in worker_qs:
                try:
                    if worker.is_available():
                        logger.info(
                            'try to reset real ue server {} for user {}'.format(worker.streaming_url, user_id))
                        reset_resp = requests.get(urljoin(worker.ttsa_url, '/interrupt'))
                        reset_resp.raise_for_status()
                        logger.info('reset real ue server {} for user {}'.format(worker.grpc_url, user_id))
                        user_server_obj.worker = worker
                        logger.info('try to confirm worker {} for user {}'.format(worker, user_id))
                        user_server_obj.save()
                        logger.info('confirmed worker {} for user {} and return'.format(worker, user_id))
                        return Response({
                            "error_code": 0,
                            "error_reason": "success",
                            'data': {
                                'ue4_url': worker.streaming_url,
                                'ttsa_url': worker.ttsa_url,
                            },
                        })
                except Exception as exc:
                    logger.error("acquire error, %s", str(exc), exc_info=True)
                    continue
            return Response({'error_code': 1, 'error_reason': 'no idle UE workers'})

    @expose(["PUT"])
    @transaction.atomic
    def release(self, request):
        user_id = request.data.get('user_id')
        key = request.data.get('key')
        logger.info('get release request from {}_{} and ready to release room'.format(user_id, key))
        models.UserRoom.objects.filter(user_id=user_id, key=key).update(worker=None)
        models.UserJanusRoom.objects.filter(user_id=user_id, key=key).update(worker=None)
        logger.info('release operation from {}_{} complete'.format(user_id, key))
        return Response({'error_code': 0, 'error_reason': 'success'})

    @expose(['POST'])
    def open_new(self, request):  # for DMP
        """
        0 fix JanusRoomRecoder data
        1 get room
        2 init room
        3 init wtrr
        """
        # for r in JanusRoomRecoder.objects.all():
        #     if not UserJanusRoom.objects.filter(user_id=r.user_id, username=r.username).exists():
        #         # clean dirty data
        #         r.delete()

        cleanse_dirty_data_janus_room_recorder()

        user_info = request.data
        if 'user_info' in request.data:
            user_info = request.data['user_info']

        user_id = user_info['user_id']
        org_id = request.query_params['org_id']
        secret_id = request.data['secret_id']
        name = request.data['name']
        source = request.data.get("source", "数字人管理")
        access_type = request.data['access_type']
        offline = request.data.get('offline', False)
        is_test = request.data.get('is_test', False)
        org_limit = request.data.get('org_limit', 1)
        secret_id_limit = request.data.get('secret_id_limit', 1)
        init_room_data = request.data.get('init_room_data', {})
        static = request.data.get('static', False)  # True/False -> 静态角色/动态角色。静态角色不会晃动不会眨眼

        janus_server = JanusServer.objects.first()
        janus_server_id = request.data.get('janus_server_id', None)
        if janus_server_id:
            janus_server = JanusServer.objects.get(id=janus_server_id)

        # get and verify extra mode: wtrr or trtc
        ## trtc 腾讯小程序(rtmp)
        ## wtrr 自定义rtp rtmp 服务
        trtc_mode = request.data.get('trtc_mode', False)
        wtrr_mode = request.data.get('wtrr_mode', False)

        if trtc_mode and wtrr_mode:
            return Response({
                "error_code": 10010,
                "error_reason": "不能同时支持trtc模式和wtrr模式",
            })

        # get and verify trtc data
        # get and verify wtrr data
        rtp_video_addr = request.data.get('rtp_video_addr', '')
        rtp_audio_addr = request.data.get('rtp_audio_addr', '')
        rtmp_addr = request.data.get('rtmp_addr', '')

        wtrr_initializer = WTRRMode(wtrr_mode, user_info, init_room_data, janus_server, {
            'rtp_video_addr': rtp_video_addr,
            'rtp_audio_addr': rtp_audio_addr,
            'rtmp_addr': rtmp_addr,
        })
        trtc_initializer = TRTCMode(trtc_mode, {**user_info, 'org_id': org_id}, init_room_data, janus_server)

        try:
            trtc_initializer.do_pre_room()
            wtrr_initializer.do_pre_room()
        except Exception as e:
            logger.error(traceback.format_exc())
            return Response({
                "error_code": 10011,
                "error_reason": e,
            })

        # get room
        with ExitStack() as stack:
            if settings.USE_OPEN_ROOM_LOCK:
                stack.enter_context(cache.lock(key=settings.OPENROOM_LOCK, timeout=10, sleep=0.05))
            with transaction.atomic():
                try:
                    logger.info("OPEN, try to open room for user_id %s", user_info['user_id'])
                    # get opened room for the same user
                    userroom_obj = UserJanusRoom.objects.get(user_id=user_info['user_id'])
                    userroom_obj.key = user_info['key']
                    userroom_obj.username = user_info.get('username')
                    userroom_obj.save()
                    room_obj = userroom_obj.room
                    if room_obj.offline != offline:
                        userroom_obj.delete()
                        JanusRoomRecoder.objects.filter(user_id=user_info['user_id']).delete()
                        raise UserJanusRoom.DoesNotExist('切换房间offline属性')
                except UserJanusRoom.DoesNotExist:
                    # open a new room
                    # check room limit
                    org_opened_room_count = JanusRoomRecoder.objects.filter(org_id=org_id, offline=offline).count()
                    if org_opened_room_count >= org_limit:
                        return Response({
                            "error_code": 10012,
                            "error_reason": "企业数字人在线数量达到上限",
                        })

                    secret_id_opened_room_count = JanusRoomRecoder.objects.filter(
                        org_id=org_id,
                        secret_id=secret_id,
                        offline=offline
                    ).count()
                    if secret_id_opened_room_count >= secret_id_limit:
                        return Response({
                            "error_code": 10013,
                            "error_reason": "单个数字人在线数量达到上限",
                        })

                    # exclude opened room
                    room_queryset = JanusRoom.objects.exclude(userjanusroom__in=UserJanusRoom.objects.all())
                    room_queryset = room_queryset.filter(offline=offline)

                    # filter room by tag
                    tag = request.data.get('tag', None)
                    if tag:
                        room_queryset = room_queryset.filter(tag__tag=tag)
                    else:  # tag is ''  !!!!!
                        room_queryset = room_queryset.filter(tag__tag=None)

                    # get available room
                    for room_obj in room_queryset:
                        try:
                            # if room_obj.is_available():
                            if room_obj.is_free:
                                break
                        except:
                            continue
                    else:
                        return Response({"error_code": 10014, "error_reason": "资源占用中，请稍后再试"})

                    # # update pin
                    # secret = settings.JANUS_VIDEOROOM_SECRET
                    # new_pin = create_room_pin()
                    # janus_proxy = JanusProxy(janus_server.server_info)
                    # result = janus_proxy.videoroom_edit_pin(room_obj.room_id, secret, new_pin)
                    # room_obj.pin = new_pin
                    # room_obj.save()

                    # create user and room record
                    data = {
                        "room": room_obj,
                        "user_id": user_info['user_id'],
                        "key": user_info['key'],
                        "username": user_info.get('username'),
                    }
                    userroom_obj = UserJanusRoom.objects.create(**data)

                # init room
                if offline:  # offline room
                    fps = init_room_data.get('fps', 24)
                    resolution = init_room_data.get('resolution', '1920x1080')
                    video_file_type = init_room_data.get('video_file_type', 'h264')
                    task_source_name = request.data.get('task_source_name', 'digital')
                    init_offline_room_resp = init_offline_room(room_obj, fps, resolution, video_file_type, org_id,
                                                               secret_id, task_source_name=task_source_name)
                    if init_offline_room_resp.status_code != 200:
                        UserJanusRoom.objects.filter(pk=userroom_obj.pk).delete()
                        logger.error("offline room switch error: %s", init_offline_room_resp.text)
                        return Response({
                            'error_code': 10015,
                            'error_reason': '{}'.format(init_offline_room_resp.text)
                        })
                else:  # online room
                    # interrupt previous video/audio before assign a live room
                    if source == '数字人管理':  # TODO: remove me at next version
                        init_room_data['logo_visible'] = False
                    ttsa_proxy.safe_ttsa_ue4_config_forward(room_obj.ttsa_server_info, init_room_data)
                    if static:
                        ttsa_proxy.ttsa_stop_face_forward(room_obj.ttsa_server_info)
                    else:
                        ttsa_proxy.ttsa_start_face_forward(room_obj.ttsa_server_info)
                    res = ttsa_proxy.ttsa_interrupt_forward(room_obj.ttsa_server_info)
                    if res.status_code != 200:
                        raise ttsa_proxy.GatewayHelperException(
                            200, ttsa_proxy.PROXY_ERROR.ttsa_server_error,
                            detail='ttsa interrupt request, {}, {}'.format(res.status_code, res.content))

                wtrr_initializer.set_room_obj(room_obj)
                trtc_initializer.set_room_obj(room_obj)
                # extra mode need call wtrr&trtc grpc api
                wtrr_initializer.do_after_room()
                trtc_data = trtc_initializer.do_after_room()
                logger.info(trtc_data)

                # create room limit record
                if not JanusRoomRecoder.objects.filter(user_id=user_info['user_id']).exists():
                    JanusRoomRecoder.objects.create(
                        user_id=user_info['user_id'],
                        username=user_info.get('username'),
                        room_id=room_obj.room_id,
                        org_id=org_id,
                        secret_id=secret_id,
                        source=source,
                        name=name,
                        access_type=access_type,
                        offline=offline,
                        is_test=is_test,
                    )
                logger.info("OPEN, open room for user_id %s, room_id %s", user_info['user_id'], room_obj.room_id)
                return Response({
                    "error_code": 0,
                    "error_reason": "success",
                    "data": {
                        'wtrr_mode': wtrr_mode,
                        'trtc_mode': trtc_mode,
                        'room_id': room_obj.room_id,
                        'janus_server_info': janus_server.outer_server_info,
                        'janus_websocket_server_info': janus_server.outer_websocket_server_info,
                        'ue4_server_info': room_obj.ue4_server_info,
                        'ttsa_server_info': room_obj.ttsa_server_info,
                        'ppg_grpc_server_info': room_obj.ppg_grpc_server_info,
                        'pin': room_obj.pin,
                        'app_server_info': settings.APP_SERVER,
                        'audio_proxy_server_info': settings.AUDIO_PROXY_SERVER,
                        **trtc_data,
                    }
                })

    @expose(['POST'])
    @transaction.atomic
    def open(self, request):
        with ExitStack() as stack:
            if settings.USE_OPEN_ROOM_LOCK:
                stack.enter_context(cache.lock(key=settings.OPENROOM_LOCK, timeout=10, sleep=0.05))
            # get room_tag
            if 'user_info' in request.data:
                user_info = request.data['user_info']
            else:
                user_info = request.data
            try:
                # get opened room for the same user
                models.UserJanusRoom.objects.filter(user_id=user_info['user_id']).delete()
                ttsa_room = models.UserRoom.objects.get(user_id=user_info['user_id'])
                ttsa_room.key = user_info['key']
                ttsa_room.username = user_info.get('username')
                ttsa_room.save()
                room_object = ttsa_room.room
            except models.UserRoom.DoesNotExist:
                # open a new room
                # exclude opened room
                offline = request.data.get('offline', False)
                ttsa_queryset = models.TTSARoom.objects.exclude(
                    userroom__in=models.UserRoom.objects.all(),
                ).filter(offline=offline)
                tag = request.data.get('tag')
                if tag:
                    ttsa_queryset = ttsa_queryset.filter(tag__tag=tag)
                else:
                    ttsa_queryset = ttsa_queryset.filter(tag__tag=None)
                room_object = None
                for ttsa_obj in ttsa_queryset:
                    try:
                        if ttsa_obj.is_available():
                            room_object = ttsa_obj
                            break
                    except:
                        continue
                if not room_object:
                    return Response({"error_code": 300101, "error_reason": "资源占用中，请稍后再试"})
                data = {
                    "room": room_object,
                    "user_id": user_info['user_id'],
                    "key": user_info['key'],
                    "username": user_info.get('username'),
                }
                models.UserRoom.objects.create(**data)

            init_room_data = request.data.get('init_room_data', None)
            if init_room_data:
                ttsa_proxy.safe_ttsa_ue4_config_forward(room_object.ttsa_server_info, init_room_data)
            return Response({
                "error_code": 0,
                "error_reason": "success",
                "data": {
                    'room_id': room_object.room_id,
                    'ue4_server_info': room_object.ue4_server_info,
                    'ttsa_server_info': room_object.ttsa_server_info,
                    'app_server_info': settings.APP_SERVER,
                }
            })

    @expose(['POST'])
    @transaction.atomic
    def close(self, request):
        if 'user_info' in request.data:
            user_info = request.data['user_info']
        else:
            user_info = request.data
        user_id = user_info['user_id']
        room_id = request.data['room_id']
        logger.info("CLOSE! user_id %s, room_id %s", user_id, room_id)
        if not models.UserJanusRoom.objects.filter(room_id=room_id, user_id=user_id).exists():
            logger.warning("CLOSE_WARNING, user_id %s, room_id %s not exists. Return success directly", user_id,
                           room_id)
            return Response({
                'error_code': 0,
                'error_reason': 'connection successfully closed'
            })
        ret = models.UserJanusRoom.objects.filter(room_id=room_id, user_id=user_id).delete()
        logger.info("CLOSE! close info %s", ret)

        # delete room limit record by user_id
        JanusRoomRecoder.objects.filter(user_id=user_id).delete()

        # try set close room status: fps=1, resolution=360x480
        # try call wtrr gprc api
        try:
            janusroom_obj = models.JanusRoom.objects.get(room_id=room_id)
            ttsa_proxy.ttsa_interrupt_forward(janusroom_obj.ttsa_server_info)
            time.sleep(0.2)
            ttsa_proxy.safe_ttsa_ue4_config_forward(janusroom_obj.ttsa_server_info, {
                # "fps": 1,
                # "resolution": "360x480",
                "idle_response_config": {
                    "idle_response": [],
                    "idle_response_interval": 10,
                    "tts_vendor": "XMOV",
                    "tts_vcn": 0
                }
            })
            if janusroom_obj.offline:
                requests.get(urljoin(janusroom_obj.ttsa_server_info, 'after_close'))
            wtrr_grpc_server_info = janusroom_obj.wtrr_grpc_server_info
            with grpc.insecure_channel(wtrr_grpc_server_info) as channel:
                stub = webrtc_to_rtp_rtmp_pb2_grpc.WebrtcToRtpRtmpStub(channel)
                logger.info("call wtrr stop action")
                grpc_resp = stub.stop(webrtc_to_rtp_rtmp_pb2.StopRequest())
                logger.info("status: %s, msg: %s" % (grpc_resp.status, grpc_resp.msg))
        except models.JanusRoom.DoesNotExist:
            logger.info("Not janus room")
        except:
            logger.info(traceback.format_exc())

        if API_GATEWAY_URL:
            try:
                logout_resp = requests.post(urljoin(API_GATEWAY_URL, 'user/account/logout/'), json=user_info)
                logout_resp.raise_for_status()
            except Exception as e:
                logger.info('logout request failed, user_id: {} room_id: {} reason: {}'.format(user_id, room_id, e))

        return Response({
            'error_code': 0,
            'error_reason': 'connection successfully closed'
        })

    @expose(['GET'])
    def ttsa_info(self, request):
        try:
            if 'user_info' in request.query_params:
                user_info = request.query_params['user_info']
            else:
                user_info = request.data
            data = get_ttsa_info(user_info['user_id'])
            return Response({
                'error_code': 0,
                'error_reason': 'success',
                'data': data
            })
        except:
            return Response({
                'error_code': 300103,
                'error_reason': 'the connection is no longer active'
            })

    @expose(['POST', 'GET'])
    def ttsa(self, request):
        if request.method == 'GET':
            data = request.query_params
        else:
            data = request.data
        ttsa_server_info = data.get('ttsa_server_info', '')
        if 'user_info' in data:
            user_info = data['user_info']
        else:
            user_info = data
        if not ttsa_server_info:
            ttsa_server_info = get_ttsa_info(user_info['user_id'])['ttsa_server_info']
        async_mode = ttsa_proxy.get_true_or_false(data.get('async', True))
        text = data['text']
        action = data.get('action', 0)
        interrupt = data.get('interrupt', False)
        debug = data.get('debug', False)
        others = {}
        session_id = '{}_{}'.format(user_info['username'], user_info['key'])
        for k, v in data.items():
            if k not in {'text', 'ttsa_server_info', 'async', 'interrupt', 'debug', 'user_id', 'key', 'session_id'}:
                others[k] = v

        # 检查text是否为合法的xml
        if '<speak' in text:
            try:
                ET.fromstring(text)
            except ET.ParseError as exc:
                raise ttsa_proxy.GatewayHelperException(200, ttsa_proxy.PROXY_ERROR.xml_format_error, detail=str(exc))

        if interrupt:
            res = ttsa_proxy.ttsa_interrupt_forward(ttsa_server_info)
            if res.status_code != 200:
                raise ttsa_proxy.GatewayHelperException(200, ttsa_proxy.PROXY_ERROR.ttsa_server_error,
                                                        detail='ttsa interrupt request, {}, {}'.format(res.status_code,
                                                                                                       res.content))

        timeout, res = ttsa_proxy.ttsa_forward(ttsa_server_info, text, async_mode, request.user.id,
                                               session_id=session_id, debug=debug, **others)
        models.JanusRoomRecoder.objects.filter(user_id=user_info['user_id']).update(action=action)
        if timeout:
            interrupt_resp = ttsa_proxy.ttsa_interrupt_forward(ttsa_server_info)
            if interrupt_resp.status_code != 200:
                raise ttsa_proxy.GatewayHelperException(200, ttsa_proxy.PROXY_ERROR.ttsa_server_error,
                                                        detail='timeout, ttsa interrupt request, {}, {}'.format(
                                                            interrupt_resp.status_code,
                                                            interrupt_resp.content))
            raise ttsa_proxy.GatewayHelperException(200, ttsa_proxy.PROXY_ERROR.ttsa_server_error,
                                                    detail='timeout, call ttsa interrupt(succeed)')
        if res.status_code != 200:
            raise ttsa_proxy.GatewayHelperException(200, ttsa_proxy.PROXY_ERROR.ttsa_server_error,
                                                    detail='send text {}, {}, {}'.format(text, res.status_code,
                                                                                         res.content))
        return Response({
            'error_code': 0,
            'error_reason': 'success',
        })

    @expose(['POST'])
    def interrupt(self, request):
        ttsa_server_info = request.data.get('ttsa_server_info', '')
        if not ttsa_server_info:
            if 'user_info' in request.data:
                user_info = request.data['user_info']
            else:
                user_info = request.data
            ttsa_server_info = get_ttsa_info(user_info['user_id'])['ttsa_server_info']
        res = ttsa_proxy.ttsa_interrupt_forward(ttsa_server_info)
        if res.status_code != 200:
            raise ttsa_proxy.GatewayHelperException(200, ttsa_proxy.PROXY_ERROR.ttsa_server_error,
                                                    detail='ttsa interrupt request, {}, {}'.format(res.status_code,
                                                                                                   res.content))
        return Response({
            'error_code': 0,
            'error_reason': '',
        })

    @expose(['POST'])
    def ue4_config(self, request):
        # ttsa_server_info = request.data.get('ttsa_server_info', '')
        ttsa_server_info = None
        if not ttsa_server_info:
            if 'user_info' in request.data:
                user_info = request.data['user_info']
            else:
                user_info = request.data
            ttsa_server_info = get_ttsa_info(user_info['user_id'])['ttsa_server_info']
        res = ttsa_proxy.safe_ttsa_ue4_config_forward(ttsa_server_info, request.data)
        if res.status_code != 200:
            return Response({
                'error_code': 1,
                'error_reason': 'ttsa ue4_config request, ttsa server error: {}, {}'.format(
                    res.status_code,
                    res.content
                )
            })
        return Response({
            'error_code': 0,
            'error_reason': '',
        })

    @expose(['POST'])
    def mute(self, request):
        ttsa_server_info = request.data.get('ttsa_server_info', '')
        if not ttsa_server_info:
            if 'user_info' in request.data:
                user_info = request.data['user_info']
            else:
                user_info = request.data
            ttsa_server_info = get_ttsa_info(user_info['user_id'])['ttsa_server_info']
        res = ttsa_proxy.ttsa_mute_forward(ttsa_server_info, request.data)
        if res.status_code != 200:
            return Response({
                'error_code': 1,
                'error_reason': 'ttsa mute(ttsa_config) request, ttsa server error: {}, {}'.format(
                    res.status_code,
                    res.content
                )
            })
        return Response({
            'error_code': 0,
            'error_reason': '',
        })

    @expose(['POST'])
    def in_process(self, request):
        ttsa_server_info = request.data.get('ttsa_server_info', '')
        if not ttsa_server_info:
            if 'user_info' in request.data:
                user_info = request.data['user_info']
            else:
                user_info = request.data
            ttsa_server_info = get_ttsa_info(user_info['user_id'])['ttsa_server_info']
        forward_resp = ttsa_proxy.ttsa_in_process_forward(ttsa_server_info)
        return Response({
            'error_code': 0,
            'error_message': '',
            'data': forward_resp.json()
        })

    @expose(['GET'])
    def ppg_address(self, request):
        user_id = request.query_params['user_id']
        key = request.query_params['key']
        authed_qs = models.UserJanusRoom.objects.filter(user_id=user_id, key=key).values('room__ppg_grpc_server_info',
                                                                                         'room__ttsa_server_info')
        if authed_qs.exists():
            ppg_user_janus_room = authed_qs.first()
            ttsa_proxy.ttsa_interrupt_forward(ppg_user_janus_room['room__ttsa_server_info'])
            ttsa_proxy.safe_ttsa_ue4_config_forward(ppg_user_janus_room['room__ttsa_server_info'], {
                "idle_response_config": {
                    "idle_response": [],
                    "idle_response_interval": 10,
                    "tts_vendor": "XMOV",
                    "tts_vcn": 0
                }
            })
            return Response({'grpc_addr': ppg_user_janus_room['room__ppg_grpc_server_info']})
        return Response({}, 401)


class UE4WorkerView(CustomizedAPIView):
    model = models.UE4Worker
    serializer_class = serializers.UE4WorkerSerializer
    lookup_field = 'id'

    def get(self, request):
        return self._i_get(request)

    def post(self, request):
        return self._i_post_and_put(request)


# =========================================NO USE=========================================


class TTSARoomView(CustomizedAPIView):
    model = models.TTSARoom
    serializer_class = serializers.TTSARoomSerializer
    lookup_field = 'room_id'

    def get(self, request):
        return self._i_get(request)

    def post(self, request):
        return self._i_post_and_put(request)
