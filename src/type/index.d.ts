interface IOptions {
  container: string;
  server: string;
  appServer: string;
  janusServer: string;
  width: number;
  height: number;
  account: ILoginOptions;
  widgetCallback: Function;
  errorCallback: Function;
  webrtcCallback?: Function;
  onVideoLoadedData?: Function;
  config: {
    auto_action: boolean;
    fps: number;
    max_bitrate: number;
    tag: string;
    secret_id?: string; // v1.2.0之后废弃
    video?: boolean; // v1.2.0之后废弃
  };
  bizMode?: string; // sdk应用场景模式
  ajax: Function;

  // PJF?: IPJF // 员工APP PJF框架能力对象
}

interface IPJF {
  ajax: Function;
}

interface IToken {
  user_id: number;
  key: string;
  session_id: string;
  expire_in?: number;
  expire_time?: string;
}

interface IRoom {
  room_id: string;
  ue4_server_info: string;
  app_server_info: string;
  ttsa_server_info: string;

  janus_server_info: string;
  janus_websocket_server_info: string;
  pin: string;
}

interface IChat {
  query_text: string;
  auto_action: boolean;
  nlp: boolean;
}
interface IConfig {
  video?: boolean;
  fps: number;
  max_bitrate: number;
}

interface IWebRTCClient {
  setup(config: IRoom, webrtcCallback?: Function): Promise<any>;
  leaveRoom(): void;
}

type LooseObject = {
  [key: string]: any;
};

declare module "*.json" {
  const value: any;
  export default value;
}

interface Window {
  __setupTime: number;
  __onVideoLoadedDataTime: number;
}

interface ILoginOptions {
  username: string;
  app_id: string;
  app_secret?: string; // 2.0后废弃
  role_id: string;
  access_token: string;
  now_time: number;
}
