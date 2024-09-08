const axios = require("axios");
const cron = require("node-cron");
const { Redis } = require("../redis/redis");

const { renewToken } = require("../services/accountService");

async function checkTokenRequest() {
  const client = new Redis();
  const val = await client.get("ACCESS_TOKEN");
  const { token } = JSON.parse(val.data);
  const headers = {
    "Accept-Encoding": "gzip",
    Authorization: `Bearer ${token}`,
    Connection: "Keep-Alive",
    "Content-Type": "application/json",
    devicedrmid: DEVICE_DRM_ID,
    deviceid: DEVICE_ID,
    deviceName: DEVICE_NAME,
    devicetype: DEVICE_TYPE,
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

function initRenewTokenCron() {
  cron.schedule("59 59 23 * * *", renewToken);
}

module.exports = {
  initRenewTokenCron: initRenewTokenCron,
  checkTokenRequest: checkTokenRequest,
};
