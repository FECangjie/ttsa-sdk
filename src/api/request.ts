interface IOptions {
  method?: "GET" | "POST";
  path: string;
  body: LooseObject;
  Authorization?: string;
}
export default class Request {
  private baseURL: string;
  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  send(options: IOptions): Promise<any> {
    const method = options.method || "GET";
    const isGet = method === "GET";
    let url = this.baseURL + options.path;
    if (options.path.includes('http')) {
      url = options.path;
    }

    return new Promise((resolve, reject) => {
      const oReq = new XMLHttpRequest();
      oReq.responseType = "json";
      oReq.onreadystatechange = function () {
        if (this.readyState === oReq.DONE) {
          if (!!this.response) {
            resolve(this.response);
          } else {
            if (window.webrtcFailedCallback) {
              window.webrtcFailedCallback();
            }
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
      const data = isGet ? null : JSON.stringify(options.body);

      oReq.open(method.toLocaleLowerCase(), uri, true);
      oReq.setRequestHeader("Content-Type", "application/json;charset=utf-8");
      oReq.setRequestHeader("Accept", "application/json;charset=utf-8");
      if (options.Authorization) {
        oReq.setRequestHeader("Authorization", options.Authorization);
      }
      oReq.send(data);
    });
  }
}
