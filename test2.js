const { checkTokenRequest, renewToken } = require("./src/cron/tokenCron");

//renewToken();
checkTokenRequest()
  .then((r) => {
    console.log(r);
  })
  .catch();
