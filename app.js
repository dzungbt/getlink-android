require("dotenv").config();
const express = require("express");
const app = express();

const watchRouter = require("./routes/watch")

let wrapper = new require(`./providers/${process.env.PROVIDER}`);
global.provider = new wrapper[process.env.PROVIDER]();


const {
    initRenewTokenCron,
    initValidateTokenCron
} = require("./src/cron/tokenCron")

console.log(global.provider)

initRenewTokenCron();
initValidateTokenCron();

app.use("/watch", watchRouter)



app.use((err, req, res, next) => {
  return res.status(500).send();
});


app.listen(process.env.PORT || 3000, (req,res) => {
})