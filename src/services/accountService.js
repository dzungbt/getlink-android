async function renewToken() {
  const NUMBER_OF_REQUEST_RETRIES = 3;
  const client = new Redis();
  let token = null;
  let i = 0;
  while (i <= NUMBER_OF_REQUEST_RETRIES) {
    if (i == NUMBER_OF_REQUEST_RETRIES) return;
    try {
      token = await getTokenRequest();
      break;
    } catch (e) {
      console.log(e);
      i++;
    }
  }
  //console.log(token);
  await client.set("ACCESS_TOKEN", { token: token });
  console.log("Done");
  client.clearClient();
}

async function getTokenRequest() {
  const body = {
    deviceInfo: {
      deviceDrmId: DEVICE_DRM_ID,
      deviceId: DEVICE_ID,
      deviceName: DEVICE_NAME,
      deviceType: DEVICE_TYPE,
      osType: OS_TYPE,
      osVersion: OS_VERSION,
      screenSize: SCREEN_SIZE,
      selected: false,
    },
    grantType: "PASS",
    msisdn: USERNAME,
    password: PASSWORD,
  };

  const response = await axios.post(LOGIN_URL, body);
  const token = response.data.data.accessToken;
  return token;
}

module.exports = {
  renewToken: renewToken,
};
