import { log } from "./tools/utils";
import Janus, { JanusJS } from "janus-typescript-client";

class JanusClient implements IWebRTCClient {
  private tag = ":::[JanusClient]";
  private resolve: any;
  private reject: any;

  private containerEl: HTMLDivElement;
  private videoEl: HTMLVideoElement | null = null;

  private janus: Janus | null = null;
  private opaqueId = "videoroomtest" + Janus.randomString(12);
  private sfutest?: JanusJS.PluginHandle;
  private server?: string;
  private roomId?: number;
  private pin?: string;
  private rfindex?: number;
  // private myusername?: string
  private myid?: string;
  // private mystream = null
  // We use this other ID just to map our subscriptions to us
  private mypvtid?: string;

  // private bitrateTimer = []
  // private aggregateStatsIntervalId?: string
  private remoteFeed?: JanusJS.PluginHandle;

  private options?: IOptions;

  closed = false;

  constructor(containerEl: HTMLDivElement) {
    this.containerEl = containerEl;
  }

  setup(
    config: IRoom,
    webrtcCallback?: (online: boolean) => void,
    options?: IOptions
  ): Promise<any> {
    this.closed = false;
    this.roomId = parseInt(config.room_id);
    this.pin = config.pin;
    this.server = config.janus_server_info;
    this.options = options;
    const { janusServer } = options || {};
    log(this.tag, "【 ttsa options 】");
    console.log(options);
    log(this.tag, "【 webrtc config 】");
    console.log(config);

    return new Promise((res, rej) => {
      this.resolve = res;
      this.reject = rej;
      log(this.tag, "【 webrtc janus地址 】");
      console.log(janusServer || this.server);

      Janus.init({
        debug: window.location.search.indexOf("janus=true") > -1,
        callback: () => {
          console.log("【 janus init 】");
          this.janus = new Janus({
            // server: `${janusServer}/${1}` || this.server,
            // @ts-ignore
            server: janusServer || this.server,
            success: () => {
              console.log("Janus服务创建成功！");
              this.attachVideoRoom();
            },
            error: (err: any) => {
              log(this.tag, "create janus error", err);
              Janus.error(err);
            },
            destroyed: () => {
              log(this.tag, "janus destroyed");
            },
          });
        },
        statCallback: webrtcCallback,
        params: {
          // 房间号（janus多节点方案）
          roomId: this.roomId,
          // 节点数量（janus多节点方案）
          serverNode:
            location.search?.split("serverNode")[1]?.split("=")[1] || 0,
        },
      });
    });
  }

  attachVideoRoom() {
    if (!this.janus) {
      log(this.tag, "invalid janus instance");
      return;
    }
    // this.janus.attach(mediaConstraints, function(error) {  if(error) {    // error handling
    //   }  var streams = janus.getMediaStreams();  for(var i in streams) {    var stream = streams[i];    var tracks = stream.getTracks();    for(var j in tracks) {      var track = tracks[j];      if(track.kind == 'video') {        track.enabled = false;      }    }  }}, {})
    this.janus.attach({
      plugin: "janus.plugin.videoroom",
      opaqueId: this.opaqueId,
      success: (pluginHandle: any) => {
        Janus.log("pluginHandle: ", pluginHandle);
        this.sfutest = pluginHandle;
        // @ts-ignore
        Janus.log(
          `Plugin attached! (${this?.sfutest?.getPlugin()},id=${this?.sfutest?.getId()})`
        );
        Janus.log("  -- This is a publisher/manager");
        this.registerUsername();
      },
      error: (err: any) => {
        Janus.error("  -- Error attaching plugin...", err);
      },
      onmessage: (msg: any, jsep: JanusJS.JSEP | undefined) => {
        Janus.debug(" ::: Got a message (publisher) :::", msg);

        let event = msg["videoroom"];
        Janus.debug("Event: " + event);

        if (!event) {
          this.reject("invalid event");
          return;
        }

        // 通常为joined
        if (event === "joined") {
          this.myid = msg["id"];
          this.mypvtid = msg["private_id"];
          Janus.log(
            `Successfully joined room:${msg["room"]} with ID:${this.myid}`
          );
          // Any new feed to attach to?
          if (msg["publishers"]) {
            let list = msg["publishers"];
            Janus.log("Got a list of available publishers/feeds:", list);
            for (let f in list) {
              let id = list[f]["id"];
              let display = list[f]["display"];
              let audio = list[f]["audio_codec"];
              let video = list[f]["video_codec"];
              Janus.log(
                `  >> [${id}] ${display} (audio: ${audio}, video: ${video})`
              );
              if (this.remoteFeed == null) {
                this.newRemoteFeed(id, display, audio, video);
              }
            }
          }
        } else if (event === "destroyed") {
          // The room has been destroyed
          Janus.warn("The room has been destroyed!");
        } else if (event === "event") {
          // Any new feed to attach to?
          if (msg["publishers"]) {
            let list = msg["publishers"];
            Janus.log("Got a list of available publishers/feeds:", list);
            for (let f in list) {
              let id = list[f]["id"];
              let display = list[f]["display"];
              let audio = list[f]["audio_codec"];
              let video = list[f]["video_codec"];
              Janus.log(
                `  >> [${id}] ${display} (audio: ${audio}, video: ${video})`
              );
              if (this.remoteFeed == null) {
                this.newRemoteFeed(id, display, audio, video);
              }
            }
          } else if (msg["leaving"]) {
            // One of the publishers has gone away?
            let leaving = msg["leaving"];
            Janus.log("Publisher left: " + leaving);
          } else if (msg["unpublished"]) {
            // One of the publishers has unpublished?
            let unpublished = msg["unpublished"];
            Janus.log("Publisher left: " + unpublished);
            if (unpublished === "ok" && this.sfutest) {
              // That's us
              this.sfutest.hangup();
              return;
            }
          } else if (msg["error"]) {
            if (msg["error_code"] === 426) {
              // This is a "no such room" error: give a more meaningful description
              log(
                this.tag,
                `<p>Apparently room <code>${this.roomId}</code> (the one this demo uses as a test room) does not exist...</p><p>Do you have an updated <code>janus.plugin.videoroom.jcfg</code> configuration file? If not, make sure you copy the details of room <code>${this.roomId}</code> from that sample in your current configuration file, then restart Janus and try again.`
              );
            } else {
              log(msg["error"]);
            }
          }
        }
      },
    });
  }

  registerUsername() {
    const showVideo = this.options?.config.video !== false ?? true;
    const username = Janus.randomString(5);
    Janus.log(`username:${username}`);
    const register = {
      request: "join",
      room: this.roomId,
      pin: this.pin,
      ptype: "publisher",
      display: username,
      offer_video: showVideo,
    };
    // this.myusername = username;
    if (this.sfutest) {
      this.sfutest.send({ message: register });
    }
  }

  newRemoteFeed(id: string, display: any, audio: any, video: any) {
    const me = this;
    if (!this.janus) {
      log(this.tag, "invalid janus instance");
      return;
    }
    // A new feed has been published, create a new plugin handle and attach to it as a subscriber
    this.janus.attach({
      plugin: "janus.plugin.videoroom",
      opaqueId: this.opaqueId,
      success: async (pluginHandle: JanusJS.PluginHandle) => {
        // 是否视频模式
        const showVideo = me.options?.config.video !== false ?? true;
        this.remoteFeed = pluginHandle;
        // janusRemoteFeedPluginHandle = pluginHandle;
        //this.remoteFeed.simulcastStarted = false;
        // @ts-ignore
        Janus.log(
          `Plugin attached! (${this.remoteFeed.getPlugin()}, id=${this.remoteFeed.getId()})`
        );
        Janus.log("  -- This is a subscriber");
        // We wait for the plugin to send us an offer
        var subscribe = {
          request: "join",
          room: this.roomId,
          pin: this.pin,
          ptype: "subscriber",
          feed: id,
          private_id: this.mypvtid,
          offer_video: showVideo,
        };
       
        if (this.remoteFeed) {
          await this.remoteFeed.send({ message: subscribe });
        }
      },
      error: function (error: any) {
        Janus.error("  -- Error attaching plugin...", error);
      },
      onmessage: (msg: any, jsep: any) => {
        Janus.log(" ::: Got a message (subscriber) :::", msg);
        var event = msg["videoroom"];
        Janus.debug(`Event: ${event}`);
        if (msg["error"]) {
          log(msg["error"]);
        } else if (event) {
          if (event === "attached") {
            // Subscriber created and attached
            this.rfindex = 1;
            const rfid = msg["id"];
            const rfdisplay = msg["display"];
            Janus.log(
              `Successfully attached to feed ${rfid} (${rfdisplay}) in room ${msg["room"]}`
            );
          }
          // else if (event === 'event') {
          // } else {
          //   // What has just happened?
          // }
        }
        if (jsep) {
          Janus.log("Handling SDP as well...", jsep);

          // const sdpOffer = jsep.sdp;
          // jsep.sdp = sdpOffer.replace('42001f', '42e01f');

          // Answer and attach
          this.remoteFeed?.createAnswer({
            jsep: jsep,
            // Add data:true here if you want to subscribe to datachannels as well
            // (obviously only works if the publisher offered them in the first place)
            media: { audioSend: false, videoSend: false, data: true }, // We want recvonly audio/video
            success: (jsep: any) => {
              Janus.debug("Got SDP!", jsep);
              // jsep.sdp = sdpOffer;
              var body = { request: "start", room: this.roomId };
              if (this.remoteFeed) {
                this.remoteFeed.send({ message: body, jsep: jsep });
              }
            },
            error: function (error: any) {
              Janus.error("WebRTC error:", error);
              log(`WebRTC error... ${error.message}`);
            },
          });
        }
      },
      iceState: (state: any) => {
        const info = `ICE state of this WebRTC PeerConnection (feed #${this.rfindex}) changed to ${state}`;
        Janus.log(info);
        if (state === "disconnected" && !this.closed) {
          this?.options?.errorCallback("数字人链接已断开", "webrtcState_error");
        }
      },
      webrtcState: (on: any) => {
        Janus.log(
          "Janus says this WebRTC PeerConnection (feed #" +
            this.rfindex +
            ") is " +
            (on ? "up" : "down") +
            " now"
        );
      },
      // onlocalstream: (stream:any) => {
      //   // The subscriber stream is recvonly, we don't expect anything here
      // },
      onremotestream: (stream: any) => {
        // 是否视频模式
        const showVideo = me.options?.config.video !== false ?? true;
        if (this.closed) {
          Janus.debug("closed()");
          return;
        }
        Janus.debug("Remote feed #" + this.rfindex + ", stream:", stream);
        const videos = this.containerEl.querySelectorAll("video");
        if (videos.length === 0) {
          const videoStyle = `display:${
            showVideo ? "block" : "none"
          };width:100%;height:100%;`;
          const video = document.createElement("video") as HTMLVideoElement;
          video.setAttribute("style", videoStyle);
          video.setAttribute("autoplay", "true");
          video.setAttribute("playsinline", "true");
          video.setAttribute("webkit-playsinline", "true");
          video.setAttribute("id", `ttsa-video`);
          video.setAttribute("x5-playsinline", "true");
          video.setAttribute("controls", "true");
          // video.setAttribute('muted', 'true')
          video.addEventListener("click", function (e) {
            e.stopPropagation();
            video.play();
          });

          // @ts-ignore
          Janus.attachMediaStream(video, stream);
          Janus.log("Streaming attached");
          // 显示视频数据
          video.onloadeddata = function () {
            window.__onVideoLoadedDataTime = new Date().valueOf();
            log(
              `加载时间：${
                (window.__onVideoLoadedDataTime - window.__setupTime) / 1000
              }s`
            );
            setTimeout(() => {
              me.options?.onVideoLoadedData && me.options.onVideoLoadedData();
              video.removeAttribute("controls");
            }, 0);
          };
          this.containerEl.appendChild(video);
          this.videoEl = video;
          this.resolve();
        }
      },
      ondata: function (data: string, label: string) {
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
      this.remoteFeed.send({ message: { request: "leave" } });
      this.remoteFeed.send({ message: { request: "destroy" } });
      this.remoteFeed = undefined;
    }
    if (this.janus) {
      this.janus.destroy();
    }
    if (!!this.videoEl) {
      this.containerEl.removeChild(this.videoEl);
    }
    this.closed = true;
  }
}

const getWebRtcClient = (containerEl: HTMLDivElement): IWebRTCClient =>
  new JanusClient(containerEl);

export default getWebRtcClient;
