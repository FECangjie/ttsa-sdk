import FTC_TTSA_PRIM from "../main";
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
    callback && callback(payload.config);
    return;
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
        console.log(res);
        return res && res.Ssn_ID;
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
        console.log(res);
        return res;
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
        return res;
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
   * Prblm_Bl_ID 问题描述
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
    log(this.tag, "语音 predict，s功能暂无");
    console.log(actions);
  }
}

export default FTC_TTSA_BIZ;
