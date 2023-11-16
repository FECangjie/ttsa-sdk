import { log } from './utils';
import Janus, { JanusJS } from 'janus-typescript-client';

class JanusClient implements IWebRTCClient {
  private tag = ':::[JanusClient]'
  private resolve: any
  private reject: any

  private containerEl: HTMLDivElement
  private videoEl: HTMLVideoElement | null = null

  private janus: Janus | null = null
  private opaqueId = "videoroomtest" + Janus.randomString(12)
  private sfutest?: JanusJS.PluginHandle
  private server?: string
  private roomId?: number
  private pin?: string
  private rfindex?: number
  // private myusername?: string
  private myid?: string
  // private mystream = null
  // We use this other ID just to map our subscriptions to us
  private mypvtid?: string

  // private bitrateTimer = []
  // private aggregateStatsIntervalId?: string
  private remoteFeed?: JanusJS.PluginHandle

  closed = false

  constructor(containerEl: HTMLDivElement) {
    this.containerEl = containerEl
  }

  setup(config: IRoom, webrtcCallback?: (online: boolean) => void): Promise<any> {
    this.closed = false
    this.roomId = parseInt(config.room_id);
    this.pin = config.pin;
    this.server = config.janus_server_info;

    return new Promise((res, rej) => {
      this.resolve = res;
      this.reject = rej;
      Janus.init({
        debug: window.location.search.indexOf('janus=true') > -1,
        callback: () => {
          this.janus = new Janus({
            // @ts-ignore
            server: this.server,
            success: () => {
              this.attachVideoRoom();
            },
            error: (err: any) => {
              log(this.tag, 'create janus error', err);
              Janus.error(err);
            },
            destroyed: () => {
              log(this.tag, 'janus destroyed');
            },
          });
        },
        statCallback: webrtcCallback
      });
    });
  }

  attachVideoRoom() {
    if (!this.janus) {
      log(this.tag, 'invalid janus instance');
      return;
    }
    this.janus.attach({
      plugin: 'janus.plugin.videoroom',
      opaqueId: this.opaqueId,
      success: (pluginHandle: any) => {
        Janus.log('pluginHandle: ', pluginHandle);
        this.sfutest = pluginHandle;
        // @ts-ignore
        Janus.log(`Plugin attached! (${this.sfutest.getPlugin()},id=${this.sfutest.getId()})`);
        Janus.log('  -- This is a publisher/manager');
        this.registerUsername();
      },
      error: (err: any) => {
        Janus.error('  -- Error attaching plugin...', err);
      },
      onmessage: (msg: any, jsep: JanusJS.JSEP | undefined) => {
        Janus.debug(' ::: Got a message (publisher) :::', msg);

        let event = msg['videoroom'];
        Janus.debug('Event: ' + event);

        if (!event) {
          this.reject('invalid event');
          return;
        }

        if (event === 'joined') {
          this.myid = msg['id'];
          this.mypvtid = msg['private_id'];
          Janus.log(`Successfully joined room:${msg['room']} with ID:${this.myid}`);
          // Any new feed to attach to?
          if (msg['publishers']) {
            let list = msg['publishers'];
            Janus.log("Got a list of available publishers/feeds:", list);
            for (let f in list) {
              let id = list[f]['id'];
              let display = list[f]['display'];
              let audio = list[f]['audio_codec'];
              let video = list[f]['video_codec'];
              Janus.log(`  >> [${id}] ${display} (audio: ${audio}, video: ${video})`);
              if (this.remoteFeed == null) {
                this.newRemoteFeed(id, display, audio, video);
              }
            }
          }
        } else if (event === 'destroyed') {
          // The room has been destroyed
          Janus.warn('The room has been destroyed!');
        } else if (event === 'event') {
          // Any new feed to attach to?
          if (msg['publishers']) {
            let list = msg['publishers'];
            Janus.log('Got a list of available publishers/feeds:', list);
            for (let f in list) {
              let id = list[f]["id"];
              let display = list[f]["display"];
              let audio = list[f]["audio_codec"];
              let video = list[f]["video_codec"];
              Janus.log(`  >> [${id}] ${display} (audio: ${audio}, video: ${video})`);
              if (this.remoteFeed == null) {
                this.newRemoteFeed(id, display, audio, video);
              }
            }
          } else if (msg['leaving']) {
            // One of the publishers has gone away?
            let leaving = msg['leaving'];
            Janus.log('Publisher left: ' + leaving);
          } else if (msg['unpublished']) {
            // One of the publishers has unpublished?
            let unpublished = msg['unpublished'];
            Janus.log('Publisher left: ' + unpublished);
            if (unpublished === 'ok' && this.sfutest) {
              // That's us
              this.sfutest.hangup();
              return;
            }
          } else if (msg['error']) {
            if (msg["error_code"] === 426) {
              // This is a "no such room" error: give a more meaningful description
              log(this.tag, `<p>Apparently room <code>${this.roomId}</code> (the one this demo uses as a test room) does not exist...</p><p>Do you have an updated <code>janus.plugin.videoroom.jcfg</code> configuration file? If not, make sure you copy the details of room <code>${this.roomId}</code> from that sample in your current configuration file, then restart Janus and try again.`);
            } else {
              log(msg['error']);
            }
          }
        }
      },
    });
  }

  registerUsername() {
    const username = Janus.randomString(5);
    Janus.log(`username:${username}`);
    const register = {
      request: 'join',
      room: this.roomId,
      pin: this.pin,
      ptype: 'publisher',
      display: username,
    };
    // this.myusername = username;
    if (this.sfutest) {
      this.sfutest.send({ message: register });
    }
  }

  newRemoteFeed(id: string, display: any, audio: any, video: any) {
    if (!this.janus) {
      log(this.tag, 'invalid janus instance');
      return;
    }
    // A new feed has been published, create a new plugin handle and attach to it as a subscriber
    this.janus.attach({
      plugin: 'janus.plugin.videoroom',
      opaqueId: this.opaqueId,
      success: (pluginHandle: JanusJS.PluginHandle) => {
        this.remoteFeed = pluginHandle;
        // janusRemoteFeedPluginHandle = pluginHandle;
        //this.remoteFeed.simulcastStarted = false;
        // @ts-ignore
        Janus.log(`Plugin attached! (${this.remoteFeed.getPlugin()}, id=${this.remoteFeed.getId()})`);
        Janus.log('  -- This is a subscriber');
        // We wait for the plugin to send us an offer
        var subscribe = {
          request: 'join',
          room: this.roomId,
          pin: this.pin,
          ptype: 'subscriber',
          feed: id,
          private_id: this.mypvtid,
        };
        // In case you don't want to receive audio, video or data, even if the
        // publisher is sending them, set the 'offer_audio', 'offer_video' or
        // 'offer_data' properties to false (they're true by default), e.g.:
        // 		subscribe["offer_video"] = false;
        // For example, if the publisher is VP8 and this is Safari, let's avoid video
        // if(Janus.webRTCAdapter.browserDetails.browser === "safari" &&
        // 		(video === "vp9" || (video === "vp8" && !Janus.safariVp8))) {
        // 	if(video)
        // 		video = video.toUpperCase()
        // 	toastr.warning("Publisher is using " + video + ", but Safari doesn't support it: disabling video");
        // 	subscribe["offer_video"] = false;
        // }
        //this.remoteFeed.videoCodec = video;
        if (this.remoteFeed) {
          this.remoteFeed.send({ message: subscribe });
        }
      },
      error: function(error:any) {
        Janus.error('  -- Error attaching plugin...', error);
      },
      onmessage: (msg: any, jsep:any) => {
        Janus.log(' ::: Got a message (subscriber) :::', msg);
        var event = msg['videoroom'];
        Janus.debug(`Event: ${event}`);
        if (msg['error']) {
          log(msg['error']);
        } else if (event) {
          if (event === 'attached') {
            // Subscriber created and attached
            this.rfindex = 1;
            const rfid = msg['id'];
            const rfdisplay = msg['display'];
            Janus.log(`Successfully attached to feed ${rfid} (${rfdisplay}) in room ${msg['room']}`);
          }
          // else if (event === 'event') {
          // } else {
          //   // What has just happened?
          // }
        }
        if (jsep) {
          Janus.log('Handling SDP as well...', jsep);

          // const sdpOffer = jsep.sdp;
          // jsep.sdp = sdpOffer.replace('42001f', '42e01f');

          // Answer and attach
          this.remoteFeed?.createAnswer({
            jsep: jsep,
            // Add data:true here if you want to subscribe to datachannels as well
            // (obviously only works if the publisher offered them in the first place)
            media: { audioSend: false, videoSend: false, data: true }, // We want recvonly audio/video
            success: (jsep: any) => {
              Janus.debug('Got SDP!', jsep);
              // jsep.sdp = sdpOffer;
              var body = { request: 'start', room: this.roomId };
              if (this.remoteFeed) {
                this.remoteFeed.send({ message: body, jsep: jsep });
              }
            },
            error: function(error: any) {
              Janus.error('WebRTC error:', error);
              log(`WebRTC error... ${error.message}`);
            },
          });
        }
      },
      iceState: (state:any) => {
        Janus.log(`ICE state of this WebRTC PeerConnection (feed #${this.rfindex}) changed to ${state}`);
      },
      webrtcState: (on:any) => {
        Janus.log(
          'Janus says this WebRTC PeerConnection (feed #' +
          this.rfindex +
          ') is ' +
          (on ? 'up' : 'down') +
          ' now'
        );
      },
      // onlocalstream: (stream:any) => {
      //   // The subscriber stream is recvonly, we don't expect anything here
      // },
      onremotestream: (stream:any) => {
        if (this.closed) {
          Janus.debug('closed()')
          return
        }
        Janus.debug('Remote feed #' + this.rfindex + ', stream:', stream)
        const videos = this.containerEl.querySelectorAll('video')
        if (videos.length === 0) {
          const video = document.createElement('video') as HTMLVideoElement
          video.setAttribute('style', 'display:block;width:100%;height:100%;')
          video.setAttribute('autoplay', 'true')
          video.setAttribute('playsinline', 'true')
          video.setAttribute('controls', 'true')
          video.addEventListener('click', function(e) {
            e.stopPropagation()
            video.play()
          })
          // @ts-ignore
          Janus.attachMediaStream(video, stream)
          Janus.log('Streaming attached')
          video.onloadeddata = function() {
            setTimeout(() => {
              video.removeAttribute('controls')
            }, 0)
          }
          this.containerEl.appendChild(video)
          this.videoEl = video
          this.resolve()
        }
      },
      ondata: function(data: string, label: string) {
        Janus.log(`receive data: ${data}, label: ${label}`);
      },
      oncleanup: () => {
        Janus.log(` ::: Got a cleanup notification (remote feed ${id}) :::`);
        this.remoteFeed = undefined;
      },
    });
  }

  leaveRoom() {
    if (this.remoteFeed) {
      this.remoteFeed.send({ message: { request: 'leave' } })
      this.remoteFeed.send({ message: { request: 'destroy' } })
      this.remoteFeed = undefined
    }
    if (this.janus) {
      this.janus.destroy()
    }
    if (!!this.videoEl) {
      this.containerEl.removeChild(this.videoEl)
    }
    this.closed = true
  }
}

const getWebRtcClient = (containerEl: HTMLDivElement): IWebRTCClient => new JanusClient(containerEl);

export default getWebRtcClient;
