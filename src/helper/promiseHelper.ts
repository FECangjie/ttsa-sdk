import { API_ECP_URL } from "../contants";

const handleReqData = (data) => {
  const reqData = Object.assign(data, { req_type: data.req_type || "0" });
  return JSON.stringify(reqData).replace(/\"|\'/g, '"');
};

export default class PromiseAjaxHelper {
  private eventName: any = {
    success: [],
    error: [],
  };

  private _ajax: any = null;
  private _isTest: boolean = false;

  constructor(props) {
    const { ajax } = props;
    this._ajax = ajax;
  }

  public then = (cb) => {
    if (!cb) {
      return 
    }
    this.eventName.success = [cb];
    // this.eventName.success.push(cb);
    return this;
  };

  public catch = (cb) => {
    if (!cb) {
      return 
    }
    this.eventName.error = [cb];
    // this.eventName.error.push(cb);
    return this;
  };

  public post = (params) => {
    let that = this;
    const { code, data, maskAll = false } = params;
    setTimeout(() => {
      console.log("【【 请求参数 】】");
      console.log(
        JSON.stringify({
          Data_Cntnt: handleReqData(data),
        })
      );
      this._ajax({
        url: API_ECP_URL,
        safe: true,
        maskAll: maskAll,
        data: {
          _fw_service_id: "simpleTransaction",
          transaction_id: code,
          jsonData: JSON.stringify({
            Data_Cntnt: handleReqData(data),
          }),
          jsonClass: "java.util.Map",
        },
        success: function (res, status) {
          console.log("【【 返回参数 】】");
          console.log(res);
          if (res?.BK_STATUS === "00") {
            const data = JSON.parse(res?.Data_Enqr_Rslt);
            // const data = {a: 1};
            let successList = that.eventName.success;
            if (successList || successList.length) {
              successList[0](data, status);

              // for (let i = 0; i < successList.length; i++) {
              //   successList[i](data, status);
              // }
            }
          }
        },
        error: function (err, status) {
          let errorList = that.eventName.error;
          if (errorList || errorList.length) {
            errorList[0](err, status);

            // for (let i = 0; i < errorList.length; i++) {
            //   errorList[i](err, status);
            // }
          }
        },
      });
    });

    return this;
  };
}
