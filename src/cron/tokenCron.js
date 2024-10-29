const axios = require("axios");
const cron = require("node-cron");
const { Redis } = require("../redis/redis");
require("dotenv").config();

function initRenewTokenCron() {
  if (process.env.ALLOW_CRON == '1' || process.env.ALLOW_CRON == 1) {
    cron.schedule("59 59 23 * * *", global.provider.renewToken);
  }
}

function initValidateTokenCron() {
  if (process.env.ALLOW_CRON == '1' || process.env.ALLOW_CRON == 1) {
    cron.schedule("* * * * *", async () => {
      if (await global.provider.checkTokenRequest()) {
        console.log("valid token")
        return;
      }
      global.provider.renewToken();
    })
  }
}


module.exports = {
  initRenewTokenCron: initRenewTokenCron,
  initValidateTokenCron: initValidateTokenCron,
};
