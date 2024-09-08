const { BaseProvider } = require("../BaseProvider");
/**
 * TV360.
 *
 * @class TV360
 * @extends {BaseProvider}
 */

const { VALIDATE_TOKEN_URL, LOGIN_URL } = require("./constants/urlConstants");
const {
  LOGIN_DEVICE_DRM_ID,
  LOGIN_DEVICE_ID,
  LOGIN_DEVICE_NAME,
  LOGIN_DEVICE_TYPE,
  LOGIN_OS_TYPE,
  LOGIN_OS_VERSION,
  LOGIN_SCREEN_SIZE,
  LOGIN_USERNAME,
  LOGIN_PASSWORD,
} = require("./constants/loginConstants");

const {
  DEVICE_DRM_ID,
  DEVICE_ID,
  DEVICE_NAME,
  DEVICE_TYPE,
  S,
  LANG,
  OS_APP_TYPE,
  OS_APP_VERSION,
  SESSION_ID,
  USER_AGENT,
  USER_ID,
} = require("../src/constants/getLinkConstants");

class TV360 extends BaseProvider {
  constructor() {}

  async checkTokenRequest() {
    const client = new Redis();
    const val = await client.get("ACCESS_TOKEN");
    const { token } = JSON.parse(val.data);
    const headers = {
      "Accept-Encoding": "gzip",
      Authorization: `Bearer ${token}`,
      Connection: "Keep-Alive",
      "Content-Type": "application/json",
      devicedrmid: LOGIN_DEVICE_DRM_ID,
      deviceid: LOGIN_DEVICE_ID,
      deviceName: LOGIN_DEVICE_NAME,
      devicetype: LOGIN_DEVICE_TYPE,
      freedata: 1,
      Host: "api-hlc.tv360.vn",
    };
    client.clearClient();
    try {
      const { data } = await axios.get(VALIDATE_TOKEN_URL, { headers });
      return data.errorCode == 200;
    } catch (e) {
      console.log(e);
      return false;
    }
    return true;
  }

  async getTokenRequest() {
    const body = {
      deviceInfo: {
        deviceDrmId: LOGIN_DEVICE_DRM_ID,
        deviceId: LOGIN_DEVICE_ID,
        deviceName: LOGIN_DEVICE_NAME,
        deviceType: LOGIN_DEVICE_TYPE,
        osType: LOGIN_OS_TYPE,
        osVersion: LOGIN_OS_VERSION,
        screenSize: LOGIN_SCREEN_SIZE,
        selected: false,
      },
      grantType: "PASS",
      msisdn: LOGIN_USERNAME,
      password: LOGIN_PASSWORD,
    };

    const response = await axios.post(LOGIN_URL, body);
    const token = response.data.data.accessToken;
    return token;
  }

  async getM3u8ById() {}
}
