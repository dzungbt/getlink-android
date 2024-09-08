const { initRenewTokenCron } = require("./src/cron/tokenCron");
const { renewToken } = require("./src/services/accountService");
renewToken();
initRenewTokenCron();
