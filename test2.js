const {channelMapping} = require("./mapping/mapping");
const {TV360} = require("./providers/TV360")
const tv360 = new TV360();

async function test(){
  const list = [];
  for (let [channelName, channelId] of Object.entries(channelMapping)) {
    channelId = channelId["TV360"];
    const link = await tv360.getLink(channelId);
    if(link == null){
      list.push(channelName)
    }
  }
  console.log(list)
}

test();