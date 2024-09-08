const { BaseProvider } = require("../BaseProvider");
const {Redis} = require("../../src/redis/redis")
const axios = require('axios')
/**
 * TV360.
 *
 * @class TV360
 * @extends {BaseProvider}
 */
const NUMBER_OF_REQUEST_RETRIES = 5;

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
} = require("./constants/getLinkConstants");

class TV360 extends BaseProvider {
  constructor() {
    super();
  }

  async getRedisToken(){
    const client = new Redis();
    const val = await client.get("TV360_ACCESS_TOKEN");
    client.clearClient();
    if(!val.success){
      return null;
    }
    if(!val.data){
      return null
    }
    const {token} = JSON.parse(val.data)
    return token; 
  }


  async setRedisToken(token) {
    const client = new Redis();
    await client.set("TV360_ACCESS_TOKEN", { token: token });
    client.clearClient();
  }

 
  async checkTokenRequest() {
    const token = await this.getRedisToken();
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

    return await axios.post(LOGIN_URL, body);
   
  }
  async renewToken(){
    let res = null;
    let i = 0;
    while (i <= NUMBER_OF_REQUEST_RETRIES) {
      if (i == NUMBER_OF_REQUEST_RETRIES) return false;
      try {
        res = await this.getTokenRequest();
        if(res.data.errorCode !== 200){
          throw new Error("Login failed")
        }
        await this.setRedisToken(res.data.data.accessToken)
        return true;
      } catch (e) {
        console.log(e);
        i++;
      }
    }
    //console.log(token);
    return false;
  }


  async getLink(channelId){
    let res;
    let i = 0;
    while(i <= NUMBER_OF_REQUEST_RETRIES){
      if (i == NUMBER_OF_REQUEST_RETRIES){
        return null;
      }
      try{
        res = await this.getM3u8Request(channelId);
        console.log(res.data)
        if(res.data.errorCode != 200){
            const isRenewed = await this.renewToken();
            if(!isRenewed) 
              return null;
            throw new Error("Invalid token")
        }
        return res.data.data.urlStreaming;
      }catch(e){
        console.log(e);
        i++;
      }
    }
    return null;
    
  }


  async getM3u8Request(id) {
    const token = await this.getRedisToken();
    //console.log(token)
    const url = `https://api-v2-hlc.tv360.vn/public/v1/composite/get-link?llc=1&id=${id}&type=live&mod=live&t=1725699834&vtPage=home_live&vtTab=0`;
    const headers = {
      "Accept-Encoding": "gzip",
      Authorization: `Bearer ${token}`,
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
    return await axios.get(url, { headers: headers, });
   
  }
}



module.exports = {
  TV360: TV360
}