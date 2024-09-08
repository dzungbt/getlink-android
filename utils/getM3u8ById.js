require("dotenv").config();
const axios = require("axios");
const { getToken } = require("./getToken");
const zlib = require("zlib");
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

const pako = require("pako");
const ds = new DecompressionStream("gzip");

function getM3u8ById(id) {
  const token = `Bearer ${getToken()}`;
  const url = `https://api-v2-hlc.tv360.vn/public/v1/composite/get-link?llc=1&id=${id}&type=live&mod=live&t=1725699834&vtPage=home_live&vtTab=0`;
  const headers = {
    "Accept-Encoding": "gzip",
    Authorization: token,
    Connection: "Keep-Alive",
    "Content-Type": "application/json",
    devicedrmid: DEVICE_DRM_ID,
    deviceid: DEVICE_ID,
    deviceName: DEVICE_NAME,
    devicetype: DEVICE_TYPE,
    Host: "api-v2.tv360.vn",
    s: S,
    lang: LANG,
    osapptype: OS_APP_TYPE,
    osappversion: OS_APP_VERSION,
    sessionid: SESSION_ID,
    "User-Agent": USER_AGENT,
    userid: USER_ID,
    zoneid: 1,
  };
  let config = {
    headers: headers,
  };
  axios
    .get(url, {
      headers: headers,
    })
    .then((response) => {
      console.log(response.data);
      let link = response.data.data.urlStreaming;
      console.log(link);
    })
    .catch((e) => {
      console.log(e);
    });
}
getM3u8ById(2);
