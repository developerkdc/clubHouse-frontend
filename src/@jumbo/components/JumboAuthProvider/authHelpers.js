import { config } from "../../../app/config/main";

export const storeToken = (token) => {
  localStorage.setItem("token", token);
  if (!config?.authSetting?.axiosObject) {
    throw Error("axiosObject need to be set under authSettings inside app/config/main.js");
  } else {
    config.authSetting.axiosObject.defaults.headers.common["token"] = token;
    config.authSetting.axiosObject.defaults.withCredentials = true;
    document.cookie = `token=${token};`;
  }
};

export const removeToken = () => {
  localStorage.removeItem("token");
  if (!config?.authSetting?.axiosObject) throw Error("axiosObject need to be set under authSettings inside app/config/main.js");
  else delete config.authSetting.axiosObject.defaults.headers.common["token"];
};
