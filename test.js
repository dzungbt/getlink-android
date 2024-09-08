const axios = require("axios")
const {TV360} = require("./providers/TV360")

const tv360 = new TV360();

async function test (){
  await tv360.renewToken()
}
test();

//console.log(tv360)
// tv360.renewToken().then(async () => {
//   let link = await tv360.getM3u8Request(2)
//   console.log(link)
// });

