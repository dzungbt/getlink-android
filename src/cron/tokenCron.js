const axios = require("axios");
const cron = require("node-cron");
const { Redis } = require("../redis/redis");

function initRenewTokenCron() {
  cron.schedule("59 59 23 * * *", global.provider.renewToken);
}

function initValidateTokenCron() {
  cron.schedule("* * * * *", async () => {
    if (await global.provider.checkTokenRequest()) {
      console.log("valid token")
      return;
    }
    global.provider.renewToken();
  })
}


module.exports = {
  initRenewTokenCron: initRenewTokenCron,
  initValidateTokenCron: initValidateTokenCron,
};
