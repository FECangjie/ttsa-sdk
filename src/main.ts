import io from "socket.io-client/dist/socket.io";
import adapter from "webrtc-adapter";
import { HmacMD5 } from "crypto-es/lib/md5";

import pkg from "../package.json";

import { formatDate, formatNumber, log, throwError } from "./tools/utils";
import Request from "./api/request";
import RequestTest from "./api/requestTest";
import { SERVER_HOST, API_ECP_URL, BIZ_CODE, FN_GET_URL } from "./contants";
import getWebRtcClient from "./webrtc-client";
import PromiseAjaxHelper from "./helper/promiseHelper";

// @ts-ignore
window.adapter = adapter;

const Version = pkg.version;

const handleReqData = (data) => {
  const reqData = Object.assign(data, { req_type: "0" });
  return JSON.stringify(reqData).replace(/\"|\'/g, '"');
};

class FTC_TTSA {
  protected tag = `[FTC TTSA SDK v${Version}]`;

  protected options!: IOptions;

  private containerEl!: HTMLDivElement;
  protected http!: Request | RequestTest;
  protected ajax?: any = null;
  protected ajaxPromise?: any = null;
  protected token: IToken | any = null;
  protected bizType: string | null = null;
  private room: IRoom | null = null;

  private webrtcClient!: any;
  private widgetCallback: Function = (data: any) => console.log(this.tag, data);
  private errorCallback: Function = (error: any) =>
    console.log(this.tag, error);
  private widgetSocket: any = null;
  private voiceQueue: any = {
    // ws的事件队列
    start: 0,
    end: 0,
  };

  // 用于帧间隔判断是否离线，每秒检测，帧间隔大于 1500ms 判断为离线
  // (online: boolean) => console.log(this.tag, online)
  private webrtcCallback?: Function;

  constructor(options: IOptions) {
    const { width, height, widgetCallback, webrtcCallback, errorCallback } =
      options; // 视频流宽高
    this.widgetCallback = widgetCallback;
    this.errorCallback = errorCallback;
    this.webrtcCallback = webrtcCallback;

    const containerEle = document.querySelector(
      options.container
    ) as HTMLDivElement;
    if (!containerEle) {
      throwError(this.tag, "错误的容器标识：", options.container);
    }
    containerEle.style.width = `${width}px`;
    containerEle.style.height = `${height}px`;
    this.containerEl = containerEle;

    this.voiceQueue = {
      start: 0,
      end: 0,
    };
    this.options = options;

    if (options.bizMode === "test") {
      this.http = new RequestTest(options.server || SERVER_HOST);
    } else {
      this.http = new Request(options.server || SERVER_HOST);
    }

    if (options.ajax) {
      this.ajax = options.ajax;
      this.ajaxPromise = new PromiseAjaxHelper({
        ajax: options.ajax,
      });
    }
  }

  // setup() {
  //   return this.openRoom();
  // }

  setup(loginOptions: ILoginOptions) {
    const me = this;
    if (!loginOptions) {
      throwError(this.tag, "缺少登陆信息");
      return Promise.reject("缺少登陆信息");
    }
    me.options.account = loginOptions;
    // 开始时间
    window.__setupTime = new Date().valueOf();
    return this.openRoom()
      .then((room: IRoom | any) => {
        this.room = {
          ...room,
          room_id: +location.search.split("roomid=")[1] || room.room_id,
        };
        const webrtcClient = getWebRtcClient(this.containerEl);
        this.webrtcClient = webrtcClient;
        return webrtcClient.setup(this.room, this.webrtcCallback, me.options);
      })
      .then(async () => {
        await this.setupWidgetSocket();
      })
      .catch((err) => {
        // 链接异常
        this.errorCallback && this.errorCallback(err, "open_error");
        throwError(this.tag, JSON.stringify(err));
        return Promise.reject(err);
      });
  }

  private async openRoom() {
    const me = this;
    if (this.options.account) {
      return this.closeRoom()
        .then(() => me.loginAccount())
        .then((token: IToken) => {
          this.token = token;
          return this.openAccount();
        })
        .catch((err: any) => {
          // 链接异常
          this.errorCallback && this.errorCallback(err, "open_error");
          console.log(err);
        });
    }
  }

  protected getSecretId(): string {
    if (!!this.options.config.secret_id) {
      console.warn(
        this.tag,
        "config.secret_id 在下个版本即将弃用，请使用 account.role_id"
      );
      return this.options.config.secret_id;
    }
    if (!!this.options.account.role_id) {
      return this.options.account.role_id;
    }
    throwError(this.tag, "无效的 role_id");
    return "";
  }

  // private async openRoom() {
  //   const me = this;
  //   if (this.options.account) {
  //     return this.closeRoom().then(() => {
  //       return me.loginAccount().then((token: any) => {
  //         me.token = token;
  //         me.openAccount(me.token).then((room) => {
  //           const roomInfo: IRoom = room.data;
  //           console.log("room data =====>");
  //           console.log(roomInfo);
  //           me.room = roomInfo;
  //           const webrtcClient = getWebRtcClient(me.containerEl);
  //           me.webrtcClient = webrtcClient;
  //           return webrtcClient
  //             .setup(roomInfo, me.webrtcCallback)
  //             .then(() => {
  //               log(me.tag, "【【【 ws拉流 】】】");
  //               me.setupWidgetSocket();
  //             })
  //             .catch((err) => {
  //               throwError(me.tag, JSON.stringify(err));
  //               return Promise.reject(err);
  //             });
  //         });
  //       });
  //     });
  //   }
  // }

  private async loginAccount(): Promise<IToken> {
    const {
      account: { username, app_id, now_time, access_token },
    } = this.options;
    const res = await this.http.send({
      method: "POST",
      path: FN_GET_URL(this.options.bizMode, "login"),
      body: {
        username,
        app_id,
        access_token,
        ts: now_time,
      },
    });
    if (res.error_code) {
      this.errorCallback && this.errorCallback(res.error_reason, "login_error");
      throwError(this.tag, "login() error: 登陆鉴权失败");
      return Promise.reject(res);
    }
    return res;
  }

  private async openAccount() {
    if (!this.token) {
      return Promise.reject("未登录");
    }
    log(this.tag, "open()");
    const secret_id = this.getSecretId();
    const { user_id, key } = this.token;
    const { config, width, height } = this.options;
    let resolution;
    if (width && height) {
      resolution = `${width}x${height}`;
    }
    const data = Object.assign(
      { user_id, key, secret_id, resolution, room_type: "janus" },
      config
    );
    const res = await this.http.send({
      method: "POST",
      path: FN_GET_URL(this.options.bizMode, "open"),
      body: data,
    });
    if (res.error_code) {
      throwError(this.tag, res.error_reason);
      return Promise.reject(res);
    }
    return res.data;
  }

  async sendText(
    ssml: string,
    opt?: {
      xml?: boolean;
      type?: string[] | string;
    }
  ) {
    if (!this.token) {
      throwError(this.tag, "未登录");
      return;
    }
    if (!ssml) {
      return;
    }
    log(this.tag, "sendText()");
    const secret_id = this.getSecretId();
    const { user_id, key } = this.token;
    let text = ssml;

    if (opt?.xml) {
      const regex = /<[^>]*>/g;
      text = ssml.replace(regex, "");
    }

    // 过滤特殊字符
    const regFilter = /&nbsp;|<br>|<br \/>|<HTML>|<\/HTML>/g;
    text = text.replace(regFilter, "，");

    // 添加停顿
    const reg = /(《|》|:|：|——)/g;
    text = text.replace(reg, "$1，");

    if (opt?.type?.includes("autoAction")) {
      const actionSsml = await this.autoAction(text);
      text = actionSsml.data || text;
    }

    text = formatNumber(text);
    // text = formatDate(text);

    const data: LooseObject = {
      async: true,
      interrupt: true,
      user_id,
      key,
      secret_id,
      query_text: "ttsa",
      text,
    };

    return this.http
      .send({
        method: "POST",
        path: FN_GET_URL(this.options.bizMode, "ttsa"),
        body: data,
      })
      .then((res) => {
        if (res.error_code) {
          this.errorCallback &&
            this.errorCallback(res.error_reason, "sendText_error");
          throwError(this.tag, "sendText() error:", res.error_reason);
          // 链接异常
        }
      })
      .catch((err) => {
        // 链接异常
        this.errorCallback && this.errorCallback(err);
        log(this.tag, JSON.stringify(err));
      });
  }

  async chat(payload: IChat | string) {
    const me = this;
    if (!this.token) {
      throwError(this.tag, "未登录");
      return;
    }
    const obj =
      typeof payload === "string"
        ? { query_text: payload }
        : {
            // @ts-ignore
            auto_action: this.options.config.auto_action,
            ...payload,
          };
    const secret_id = this.getSecretId();
    const { user_id, key } = this.token;
    const data: LooseObject = {
      async: true,
      interrupt: true,
      user_id,
      key,
      secret_id,
      ...obj,
    };
    return this.http
      .send({
        method: "POST",
        path: FN_GET_URL(this.options.bizMode, "chat"),
        body: data,
      })
      .then((res) => {
        me.widgetCallback({
          callback_info: {
            data: res.data,
            type: "voice_chat_data",
          },
        });
        if (res.error_code) {
          this.errorCallback &&
            this.errorCallback(res.error_reason, "chat_error");
          throwError(this.tag, "chat() error:", res.error_reason);
        }
        return res;
      })
      .catch((err) => {
        // 链接异常
        this.errorCallback && this.errorCallback(err);
        log(this.tag, JSON.stringify(err));
      });
  }

  async interrupt() {
    if (!this.token) {
      throwError(this.tag, "未登录");
      return;
    }
    const { user_id, key } = this.token;
    return this.http
      .send({
        method: "POST",
        path: FN_GET_URL(this.options.bizMode, "interrupt"),
        body: { user_id, key },
      })
      .then((res) => {
        if (res.error_code) {
          this.errorCallback &&
            this.errorCallback(res.error_reason, "interrupt_error");
          throwError(this.tag, "interrupt() error:", res.error_reason);
        }
      })
      .catch((err) => {
        log(this.tag, JSON.stringify(err));
      });
  }

  async mute(muted: boolean) {
    if (!this.token) {
      throwError(this.tag, "未登录");
      return;
    }
    log(this.tag, "mute()");
    const { user_id, key } = this.token;
    const data: LooseObject = {
      mute: muted ? "1" : "0",
      user_id,
      key,
    };

    return this.http
      .send({
        method: "POST",
        path: FN_GET_URL(this.options.bizMode, "mute"),
        body: data,
      })
      .then((res) => {
        if (res.error_code) {
          this.errorCallback &&
            this.errorCallback(res.error_reason, "mute_error");
          throwError(this.tag, "mute() error:", res.error_reason);
        }
      })
      .catch((err) => {
        // 链接异常
        this.errorCallback && this.errorCallback(err);
        log(this.tag, JSON.stringify(err));
      });
  }

  async roomConfig(config: IConfig) {
    if (!this.token) {
      throwError(this.tag, "未登录");
      return;
    }
    const secret_id = this.getSecretId();
    const { user_id, key } = this.token;
    const defaultConfig = {
      video: true,
      ...config,
    };
    console.log("defaultConfig");
    console.log(defaultConfig);
    const data: LooseObject = {
      user_id,
      key,
      secret_id,
      ...defaultConfig,
    };
    const publish = {
      request: "configure",
      audio: true,
      video: defaultConfig.video,
      data: true,
    };
    const videoDom = this.containerEl.querySelector(`#ttsa-video`);
    const videoStyle = `display:${
      defaultConfig.video ? "block" : "none"
    };width:100%;height:100%;`;

    await this.webrtcClient.remoteFeed.send({ message: publish });
    videoDom?.setAttribute("style", videoStyle);

    return this.http
      .send({
        method: "POST",
        path: FN_GET_URL(this.options.bizMode, "ue4_config"),
        body: data,
      })
      .then((res) => {
        if (res.error_code) {
          this.errorCallback &&
            this.errorCallback(res.error_reason, "roomConfig_error");
          throwError(this.tag, "roomConfig() error:", res.error_reason);
        }
      })
      .catch((err) => {
        // 链接异常
        this.errorCallback && this.errorCallback(err);
        log(this.tag, JSON.stringify(err));
      });
  }

  async closeRoom() {
    if (!this.token || !this.room) {
      return Promise.resolve();
    }

    log(this.tag, "closeRoom()");
    const { user_id, key } = this.token;
    const { room_id } = this.room;

    if (this.widgetSocket) {
      this.widgetSocket.close();
    }

    if (this.webrtcClient) {
      this.webrtcClient.leaveRoom();
    }
    return this.http
      .send({
        method: "POST",
        path: FN_GET_URL(this.options.bizMode, "close"),
        body: { user_id, key, room_id },
      })
      .then((res) => {
        if (res.error_code) {
          this.errorCallback &&
            this.errorCallback(res.error_reason, "closeRoom_error");
          throwError(this.tag, "closeRoom() error:", res.error_reason);
        }
        this.token = null;
        this.room = null;
      });
  }

  // 自动生成动作
  async autoAction(text: string) {
    if (!this.token) {
      return Promise.resolve();
    }

    log(this.tag, "autoAction()");
    const { user_id, key } = this.token;

    const data = {
      text: text,
      digital_id: 1,
      // digital_id: 1778,
      insert_arm_action: true,
      keep_existent_arm_action: true,
      insert_head_action: false,
      keep_existent_head_action: false,
    };

    return this.http
      .send({
        method: "POST",
        path: FN_GET_URL(this.options.bizMode, "action"),
        body: data,
        Authorization: `token ${user_id} ${key}`,
      })
      .then((res) => {
        return res;
      });
  }

  // 暂停播放
  async pause(play: boolean) {
    if (!this.token) {
      return Promise.resolve();
    }

    log(this.tag, "pause()");
    // var publish = { request: play ? "start" : "pause"};
    var publish = {
      request: "configure",
      audio: true,
      video: false,
      data: true,
    };

    return await this.webrtcClient.remoteFeed.send({ message: publish });
  }

  setupWidgetSocket(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!this.token || !this.room) {
        return reject({ error_reason: "无效的登录信息" });
      }

      const tag = ":::[UICallback]";

      const { user_id } = this.token;
      const { app_server_info } = this.room;
      const { appServer } = this.options;

      // @ts-ignore
      this.widgetSocket = io(appServer || app_server_info);

      if (!this.widgetSocket) {
        return;
      }

      this.widgetSocket.on("connect", () => {
        log(tag, `${appServer || app_server_info} connected`);
        if (this.widgetSocket && !!this.token) {
          const emitPayload = { user_id, session_id: this.token.session_id };
          this.widgetSocket.emit("session_info", emitPayload);
          resolve(true);
        }
      });
      this.widgetSocket.on("ui_callback", (data: any) => {
        // 这里能补充一些数据
        const callback_info = data.callback_info || {};
        let id = 0;
        if (callback_info.type === "voice_end") {
          id = this.voiceQueue.start;
          this.voiceQueue.start++;
        } else if (callback_info.type === "voice_start") {
          id = this.voiceQueue.end;
          this.voiceQueue.end++;
        }
        this.widgetCallback({
          ...data,
          id,
          callback_info: { ...callback_info },
        });
      });
      this.widgetSocket.on("error", (err: Error) => {
        throwError(tag, err);
      });
      // 连接错误
      this.widgetSocket.on("connect_error", (err) => {
        this.errorCallback && this.errorCallback(err, "widgetSocket_error");
        throwError(tag, err);
      });
      this.widgetSocket.on("disconnect", (reason: any) => {
        throwError(tag, "disconnect:", reason);
        this.widgetSocket = null;
      });
    });
  }
}

console.log(`[FTC TTSA SDK v${Version}] loaded`);

// @ts-ignore
window.FTC_TTSA_PRIM = FTC_TTSA;

export default FTC_TTSA;

/**
 * 排查流程：
 * 1. 接口数据
 * 2. sdp一致性
 * 3. RTC方法兼容性
 * 4. session对齐
 * 5.
 */
