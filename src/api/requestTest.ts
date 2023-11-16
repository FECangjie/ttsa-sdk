interface IOptions {
  method?: "GET" | "POST";
  path: string;
  body: LooseObject;
}
export default class Request {
  private baseURL: string;
  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  send(options: IOptions): Promise<any> {
    const method = options.method || "GET";
    const isGet = method === "GET";

    // url特殊处理
    const url = (this.baseURL + options.path).substring(
      0,
      (this.baseURL + options.path).length - 1
    );

    // 补充参数
    const params = Object.assign({}, options.body);
    if (!params.req_type) {
      params.req_type = "0";
    }

    return new Promise((resolve, reject) => {
      const oReq = new XMLHttpRequest();
      oReq.responseType = "json";
      oReq.onreadystatechange = function () {
        if (this.readyState === oReq.DONE) {
          if (!!this.response) {
            const res =
              this.response["C-Response-Body"] &&
              this.response["C-Response-Body"].Data_Enqr_Rslt;
            resolve(JSON.parse(res) || {});
          } else {
            reject(`错误的请求:${url}`);
          }
        }
      };
      // oReq.onerror = function () {
      // }
      const paramsArray = Object.entries(options.body).map(
        ([key, val]) => `&${key}=${val}`
      );
      const queryString = paramsArray.join("").replace("&", "");

      const uri = isGet ? url + "?" + queryString : url;

      // 测试环境格式化参数
      const data = isGet
        ? null
        : JSON.stringify({
            Data_Cntnt: JSON.stringify(params),
          });
      oReq.open(method.toLocaleLowerCase(), uri, true);
      oReq.setRequestHeader("Content-Type", "application/json;charset=utf-8");
      oReq.setRequestHeader("Accept", "application/json;charset=utf-8");
      oReq.send(data);
    });
  }
}
