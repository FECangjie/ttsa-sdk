// import FTC_TTSA_PRIM from "../main";
import FTC_TTSA_PRIM from "../mainECP";
import { log, throwError } from "../tools/utils";
import Request from "../api/request";

import { BIZ_CODE, FN_GET_URL, API_BIZ_CHAT, API } from "../contants";

const handleReqData = (data) => {
  return JSON.stringify(data).replace(/\"|\'/g, '"');
};

const transEn = (text) => {
  return text
    .replace(/app|APP/g, "诶批批")
    .replace(/logo/g, "搂狗")
    .replace("E超人", "亿超人")
    .replace(/ATM|atm/g, "诶踢爱慕")
    .replace(/iPhone/g, "爱凤")
    .replace(/u|U/g, "优")
    .replace(/a|A/g, "诶")
    .replace(/p|P/g, "批")
    .replace(/i|I/g, "艾")
    .replace(/n|N/g, "嗯")
    .replace(/v|V/g, "微")
    .replace(/x|X/g, "艾克四");
};

class FTC_TTSA_BIZ extends FTC_TTSA_PRIM {
  private sessionId: string;

  constructor(options) {
    super(options);
    this.sessionId = "";
    // this.ajaxPromise = new PromiseAjaxHelper({
    //   ajax: options.ajax,
    // });
  }

  /**
   * 环境判断
   */
  async env(payload: any = {}, callback: (res?) => void) {
    const me = this;
    const reqData = Object.assign(payload, { req_type: "1" });
    log(this.tag, "env获取环境：");
    let result = {
      env: "https://apis.xmov.ai",
      appServer: "",
      janusServer: "",
      account: {
        username: "jiansheyinhang", // 用户名
        app_id: "C8Dk6aAfhiWQp8s*lrDljAvg", // app id
        app_secret: "PPWxM@1@(ZbC$Fh^FUoT8LP240Jk9C", // app secret
        role_id: "cb963ecf57524201bcda8098f93ccf36", // role id
      },
    };
    if (payload.env === "huaweiyun") {
      result = {
        env: "http://122.9.33.164:88",
        appServer: "",
        janusServer: "",
        account: {
          username: "husunqiang",
          role_id: "5f0db8fa3b904b64a89a459eafcd170f",
          app_id: "5KbEUSWiQH!qo9nHsnWLqdQM",
          app_secret: "%55^nSz%EO62Tm8qyP#gZ#yguUiLI%",
        },
      };
      this.options.account = result.account;
      this.options.server = result.env;

      this.http = new Request(result.env);
    } else if (payload.env === "opm") {
      result = {
        env: "https://opm.tech.ccb.com",
        appServer: "https://opm.tech.ccb.com",
        janusServer: "https://opm.tech.ccb.com/janus",
        account: {
          username: "husunqiang", // 用户名
          app_id: "oe@njW8nseAcI(bwnqkKTPo4", // app id
          app_secret: "51rnf^qot0jswGoGhtZK4CS2uhE8Qs", // app secret
          role_id: "728966b26fd94bc09714f11882806139", // role id
        },
      };
      this.options.account = result.account;
      this.options.server = result.env;
      this.options.appServer = result.appServer;
      this.options.janusServer = result.janusServer;

      // username 随机生成
      this.options.account.username = `${
        result.account.username
      }_${new Date().valueOf()}`;

      this.http = new Request(result.env);
    }
    callback && callback(result);

    return;

    if (this.ajax) {
      const res = this.ajaxPromise.post({
        code: BIZ_CODE.env,
        data: reqData,
        maskAll: false,
      });

      setTimeout(() => {
        res.then((res) => {
          log(this.tag, "ECP判断环境请求成功 then()");
          console.log(res);
          result = {
            env: "https://apis.xmov.ai",
            appServer: "",
            janusServer: "",
            account: {
              username: "jiansheyinhang", // 用户名
              app_id: "C8Dk6aAfhiWQp8s*lrDljAvg", // app id
              app_secret: "PPWxM@1@(ZbC$Fh^FUoT8LP240Jk9C", // app secret
              role_id: "cb963ecf57524201bcda8098f93ccf36", // role id
            },
          };
          if (res?.plan_status) {
            // 互联机
            if (res?.plan_status === "opm") {
              result = {
                env: "https://opm.tech.ccb.com",
                appServer: "https://opm.tech.ccb.com",
                janusServer: "https://opm.tech.ccb.com/janus",
                account: {
                  username: "husunqiang", // 用户名
                  app_id: "oe@njW8nseAcI(bwnqkKTPo4", // app id
                  app_secret: "51rnf^qot0jswGoGhtZK4CS2uhE8Qs", // app secret
                  role_id: "728966b26fd94bc09714f11882806139", // role id
                },
              };
            }
            // me.sendText(res?.Cnvs_Cntnt);
          }

          this.http = new Request(result.env);

          this.options.account = result.account;
          this.options.server = result.env;
          this.options.appServer = result.appServer;
          this.options.janusServer = result.janusServer;

          // username 随机生成
          this.options.account.username = `${
            result.account.username
          }_${new Date().valueOf()}`;

          callback && callback(result);
        });
      });

      return result;
    }
  }

  async register(payload: any = {}, callback: (res) => void) {
    const me = this;
    this.bizType = "0";
    const reqData = Object.assign(payload, { req_type: "1" });
    if (this.ajax) {
      log(this.tag, "register()");

      const result = this.ajaxPromise.post({
        code: BIZ_CODE.register,
        data: reqData,
        maskAll: false,
      });

      setTimeout(() => {
        result.then((res) => {
          log(this.tag, "ECP注册接口请求成功 then()");
          console.log(res);
          if (res?.Ssn_ID) {
            this.sessionId = res?.Ssn_ID;
            callback && callback(res);
            me.sendText(res?.Cnvs_Cntnt);
          }
        });
      });

      return result;
    }
  }

  // C6环境注册接口
  async registerC6(data) {
    const me = this;
    return this.http
      .send({
        method: "POST",
        path: API.registerC6,
        body: {
          req_type: "1",
          ...data,
        },
      })
      .then((res) => {
        console.log("==========");
        console.log(res);
        return res && res.Ssn_ID
      })
      .catch((err) => {
        log(this.tag, JSON.stringify(err));
      });
  }

  // C6环境注册接口
  async chatC6(data) {
    const me = this;
    return this.http
      .send({
        method: "POST",
        path: API.chatC6,
        body: {
          req_type: "1",
          ...data,
        },
      })
      .then((res) => {
        console.log("==========");
        console.log(res);
        return res
      })
      .catch((err) => {
        log(this.tag, JSON.stringify(err));
      });
  }


  // C6环境注册接口
  async asrC6(data) {
    const me = this;
    return this.http
      .send({
        method: "POST",
        path: API.asrC6,
        body: {
          req_type: "1",
          ...data,
        },
      })
      .then((res) => {
        console.log("asr==========");
        console.log(res);
        return res
      })
      .catch((err) => {
        log(this.tag, JSON.stringify(err));
      });
  }

  /**
   * 问答服务
   * IBizChat
   * Aply_Mnt_TpCd 申请 维护类型代码
   * Tx_TpCd
   *  Prblm_Bl_ID 问题描述
   * Ssn_ID
   * Prblm_Dsc
   * Bsn_ID_No
   * Chnl_ID
   * */

  async chatECP(payload: IChat, callback: (res) => void) {
    // if (!this.sessionId) {
    //   throwError(this.tag, "未登录");
    //   return;
    // }
    const me = this;
    try {
      const secret_id = this.getSecretId();
      const { user_id, key } = this.token;
    } catch (error) {}

    const reqData = Object.assign(payload, { req_type: "1" });

    const data: any = {
      ...reqData,
      role_id: "test",
      token: "test",
      user_id: 123456,
      ttsa_type: 1,
    };
    if (this.ajax) {
      log(this.tag, "chatECP()");
      const result = this.ajaxPromise.post({
        code: BIZ_CODE.chatECP,
        data: data,
        maskAll: false,
      });
      setTimeout(() => {
        result.then(async (res) => {
          log(this.tag, "ECP问答请求成功");
          console.log(res);
          const { Cnvs_Cntnt = "", Bsn_Parm_Tp } = res;

          // 音译处理 中英文混读问题

          // 绑定动作
          const ssml = await me.autoAction(transEn(Cnvs_Cntnt));
          try {
            // 尝试播放视频（为了防止视频出现暂停情况）
            const ttsaVideoDom: any = document.querySelector("#ttsa video");
            ttsaVideoDom && ttsaVideoDom.play();
          } catch (error) {}
          let timer = 0;

          // 如果是附件和图片 则延迟播报1.5秒
          if (Bsn_Parm_Tp === "2" || Bsn_Parm_Tp === "5") {
            timer = 0;
          }
          setTimeout(() => {
            me.sendText(ssml?.data || Cnvs_Cntnt);
          }, timer);

          callback && callback(res);
        });
      });
      return result;
    }
    return this.http
      .send({
        method: "POST",
        path: API_BIZ_CHAT,
        body: {
          req_type: "1",
          sessionid: this.sessionId,
          ...data,
        },
      })
      .then((res) => {
        console.log("==========");
        console.log(res);
      })
      .catch((err) => {
        log(this.tag, JSON.stringify(err));
      });
  }

  /**
   * 登出
   * @param payload
   * @param callback
   * @returns
   */
  async logoutECP(payload: any, callback: (res) => void) {
    const me = this;
    const reqData = Object.assign(payload, { req_type: "1" });

    const data: any = {
      ...reqData,
    };
    if (this.ajax) {
      log(this.tag, "logoutECP()");
      const result = this.ajaxPromise.post({
        code: BIZ_CODE.logoutECP,
        data: data,
      });

      setTimeout(() => {
        result.then((res) => {
          log(this.tag, "ECP注销成功");
          me.closeRoom();
          callback && callback(res);
        });
      });
      return result;
    }
    return null;
  }

  /**
   * asr语音
   * @param payload
   * @param callback
   * @returns
   */
  async asr(base64Data: string) {
    log(this.tag, "语音 base64Data");
    console.log(base64Data);

    return this.http
      .send({
        method: "POST",
        path: FN_GET_URL(this.options.bizMode, "asr"),
        body: {
          req_type: "1",
          data: base64Data,
        },
      })
      .then((res) => {
        console.log("==========");
        console.log(res);
        return res;
      })
      .catch((err) => {
        log(this.tag, JSON.stringify(err));
      });
  }

  /**
   * 闲聊
   * @param actions
   * @returns
   */
  async predict(actions: string) {
    const me = this;
    log(this.tag, "语音 predict");
    console.log(actions);

    return this.http
      .send({
        method: "POST",
        path: "http://13.115.19.0:9000/chat",
        // path: "http://122.9.33.164:88/predict", // 华为云 自研
        // path: "https://fangyi.shiyunidt.cn/szr/predict",
        // path: FN_GET_URL(this.options.bizMode, "predict"),
        body: {
          // dialog_acts: actions,
          data: actions,
        },
      })
      .then((res) => {
        console.log("==========");
        console.log(res);
        me.sendText(res && res.content && res.content.join("") || '您好，我不明白您的意思');
        return {
          results: res && res.content && res.content.join("") || '您好，我不明白您的意思',
        };
      })
      .catch((err) => {
        log(this.tag, JSON.stringify(err));
        me.sendText('您好，我不明白您的意思');
        return {
          results: '您好，我不明白您的意思',
        };
      });
  }
}

export default FTC_TTSA_BIZ;
