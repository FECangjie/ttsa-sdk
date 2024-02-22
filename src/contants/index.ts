export const SERVER_HOST = ""; // c6

export const API_BIZ_REGISTER = "/business/register/"; // 注册接口
export const API_BIZ_CHAT = "/business/chat/"; // 聊天接口

export const API_ECP_URL = "/ecpweb/ecpJson.action"; // ecp公共服务
// export const API_ECP_URL  = "/index.html"; // ecp公共服务

export const BIZ_CODE = {
  login: "TA238DH01",
  open: "TA238DH02",
  ttsa: "TA238DH03",
  chat: "TA238DH04",
  interrupt: "TA238DH05",
  mute: "TA238DH06",
  config: "TA238DH07",
  close: "TA238DH08",
  register: "TA238DH09",
  chatECP: "TA238DH10",
  logoutECP: "TA238DH11",
  asr: "TA238DH12",
  env: "TA238DH13",
};

export const API = {
  asrOld: "/asr/",
  asr: "/asr/getResult/",

  login: "/user/auth/eaccess_token_login/",
  chat: "/api/v1/dmp/ttsa/chat/",
  interrupt: "/api/v1/dmp/ttsa/interrupt/",
  mute: "/api/v1/dmp/ttsa/mute/",
  ue4_config: "/api/v1/dmp/ttsa/ue4_config/",
  close: "/api/v1/dmp/ttsa/close/",
  open: "/api/v1/dmp/ttsa/open/",
  ttsa: "/api/v1/dmp/ttsa/ttsa/",
  action: "/api/v1/dmp/ttsa/auto_action/",

  predict: "/predict",

  registerC6: "/szr/business/register/",
  chatC6: "/szr/business/chat/",
  logoutC6: "/szr/business/logout/",
  asrC6: "/szr/asr/getResult/",
};

export const FN_GET_URL = (bizMode, type) => {
  let bizPath = "";
  if (bizMode === "test") {
    bizPath = "/szr";
  }

  return `${bizPath}${API[type]}`;
};
