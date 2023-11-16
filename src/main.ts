import io from "socket.io-client/dist/socket.io";
import adapter from "webrtc-adapter";
// import adapter from "./lib/adapter";
import { HmacMD5 } from "crypto-es/lib/md5";

import pkg from "../package.json";

import { log, throwError } from "./tools/utils";
import Request from "./api/request";
import RequestTest from "./api/requestTest";
import { SERVER_HOST, API_ECP_URL, BIZ_CODE } from "./contants";
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
  protected httpRequest!: Request | RequestTest;
  protected ajax?: any = null;
  protected ajaxPromise?: any = null;
  protected token: IToken | null = null;
  protected bizType: string | null = null;
  private room: IRoom | null = null;

  private webrtcClient!: any;
  private widgetCallback: Function = (data: any) => console.log(this.tag, data);
  private widgetSocket: any = null;

  // 用于帧间隔判断是否离线，每秒检测，帧间隔大于 1500ms 判断为离线
  // (online: boolean) => console.log(this.tag, online)
  private webrtcCallback?: Function;

  constructor(options: IOptions) {
    const { width, height, widgetCallback, webrtcCallback } = options; // 视频流宽高
    this.options = options;

    this.widgetCallback = widgetCallback;
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

    this.options = options;
    if (options.bizMode === "test") {
      this.http = new RequestTest(options.server || SERVER_HOST);
    } else {
      this.httpRequest = new Request(options.server || SERVER_HOST);
      // this.http = new RequestTest(options.server || SERVER_HOST);
    }

    if (options.ajax) {
      this.ajax = options.ajax;
      this.ajaxPromise = new PromiseAjaxHelper({
        ajax: options.ajax,
      });
    }
  }

  setup() {
    return this.openRoom()
      .then((room: IRoom | any) => {
        this.room = room;
        const webrtcClient = getWebRtcClient(this.containerEl);
        this.webrtcClient = webrtcClient;
        return webrtcClient.setup(room, this.webrtcCallback);
      })
      .then(() => this.setupWidgetSocket())
      .catch((err) => {
        throwError(this.tag, JSON.stringify(err));
        return Promise.reject(err);
      });
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

  private async openRoom() {
    const me = this;
    if (this.options.account) {
      return this.closeRoom()
        .then(() => me.loginAccount())
        .then((token: IToken) => {
          this.token = token;
          return this.openAccount();
        });
    }
  }

  private async loginAccount(): Promise<IToken> {
    const {
      account: { username, app_id, app_secret },
    } = this.options;

    const now_time = parseInt(`${+Date.now() / 1000}`, 10);
    const key1 = app_id + app_secret + username;
    const key2 = now_time + "";

    const md5 = HmacMD5(key2, key1).toString();
    const accessToken = window.btoa(md5);

    if (this.ajax) {
      const result = this.ajax({
        url: API_ECP_URL,
        safe: true,
        maskAll: true,
        data: {
          _fw_service_id: "simpleTransaction",
          transaction_id: BIZ_CODE.login,
          jsonData: JSON.stringify({
            Data_Cntnt: handleReqData({
              username,
              app_id,
              access_token: accessToken,
              ts: now_time,
            }),
          }),
          jsonClass: "java.util.Map",
        },
        success: (res) => {
          console.log("login success =====>");
          if (res?.BK_STATUS === "00") {
            this.token = res?.Data_Enqr_Rslt;
            console.log(this.token);
          }
        },
        failure: (error) => {
          console.log(error);
        },
      });
      result.then((data) => {
        console.log("login then =====>");
        console.log(data);
      });

      return result?.Data_Enqr_Rslt;
    }

    const res = await this.http.send({
      method: "POST",
      path: "/user/auth/eaccess_token_login/",
      body: {
        username,
        app_id,
        access_token: accessToken,
        ts: now_time,
      },
    });

    if (res.error_code) {
      throwError(this.tag, "login() error:", res.error_reason);
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
    if (this.ajax) {
      const result = this.ajax({
        url: API_ECP_URL,
        safe: true,
        maskAll: true,
        data: {
          _fw_service_id: "simpleTransaction",
          transaction_id: BIZ_CODE.open,
          jsonData: JSON.stringify({
            Data_Cntnt: handleReqData(data),
          }),
          jsonClass: "java.util.Map",
        },
        success: (res) => {
          if (res?.BK_STATUS === "00") {
            console.log(res);
          }
        },
        failure: (error) => {
          console.log(error);
        },
      });
      console.log("login then =====>");
      console.log(result);

      return result;
    }
    const res = await this.http.send({
      method: "POST",
      path: "/api/v1/dmp/ttsa/open/",
      body: data,
    });
    if (res.error_code) {
      throwError(this.tag, res.error_reason);
      return Promise.reject(res);
    }
    return res.data;
  }

  async sendText(ssml: string) {
    if (!this.token) {
      throwError(this.tag, "未登录");
      return;
    }
    log(this.tag, "sendText()");
    const secret_id = this.getSecretId();
    const { user_id, key } = this.token;
    const data: LooseObject = {
      async: true,
      interrupt: true,
      user_id,
      key,
      secret_id,
      query_text: "ttsa",
      text: ssml,
    };

    return this.http
      .send({
        method: "POST",
        path: "/api/v1/dmp/ttsa/ttsa/",
        body: data,
      })
      .then((res) => {
        if (res.error_code) {
          throwError(this.tag, "sendText() error:", res.error_reason);
        }
      })
      .catch((err) => {
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
    return this.httpRequest
      .send({
        method: "POST",
        path: "/api/v1/dmp/ttsa/chat/",
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
          throwError(this.tag, "chat() error:", res.error_reason);
        }
      })
      .catch((err) => {
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
        path: "/api/v1/dmp/ttsa/interrupt/",
        body: { user_id, key },
      })
      .then((res) => {
        if (res.error_code) {
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
        path: "/api/v1/dmp/ttsa/mute/",
        body: data,
      })
      .then((res) => {
        if (res.error_code) {
          throwError(this.tag, "mute() error:", res.error_reason);
        }
      })
      .catch((err) => {
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
    const data: LooseObject = {
      user_id,
      key,
      secret_id,
      ...config,
    };

    return this.http
      .send({
        method: "POST",
        path: "/api/v1/dmp/ttsa/ue4_config/",
        body: data,
      })
      .then((res) => {
        if (res.error_code) {
          throwError(this.tag, "roomConfig() error:", res.error_reason);
        }
      })
      .catch((err) => {
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
        path: "/api/v1/dmp/ttsa/close/",
        body: { user_id, key, room_id },
      })
      .then((res) => {
        if (res.error_code) {
          throwError(this.tag, "closeRoom() error:", res.error_reason);
        }
        this.token = null;
        this.room = null;
      });
  }

  setupWidgetSocket(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!this.token || !this.room) {
        return reject({ error_reason: "无效的登录信息" });
      }

      const tag = ":::[UICallback]";

      const { user_id } = this.token;
      const { app_server_info } = this.room;

      // @ts-ignore
      // this.widgetSocket = io(app_server_info);
      this.widgetSocket = io("https://10.208.53.5:31118");

      if (!this.widgetSocket) {
        return;
      }

      this.widgetSocket.on("connect", () => {
        log(tag, `${app_server_info} connected`);
        if (this.widgetSocket && !!this.token) {
          const emitPayload = { user_id, session_id: this.token.session_id };
          this.widgetSocket.emit("session_info", emitPayload);
          resolve(true);
        }
      });
      this.widgetSocket.on("ui_callback", (data: any) => {
        this.widgetCallback(data);
      });
      this.widgetSocket.on("error", (err: Error) => {
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
