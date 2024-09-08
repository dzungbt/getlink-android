const axios = require("axios")
let body = {
  deviceInfo: {
    deviceDrmId: "DRM_A_TV360_ac7eac3c45d58a61",
    deviceId: "DRM_A_TV360_ac7eac3c45d58a61",
    deviceName: "Genymobile Galaxy S23",
    deviceType: "WEB_ANDROID",
    osType: "ANDROID",
    osVersion: "11",
    screenSize: "1080x2212",
    selected: false,
  },
  grantType: "PASS",
  msisdn: "0346678925",
  password: "htk123@",
};
axios
  .post("https://api-hlc.tv360.vn/public/v1/auth/login", body)
  .then((response) => {
    console.log(response);
  });
