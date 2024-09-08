require("dotenv").config();
const express = require("express");
const app = express();
const {channelMapping} = require("./mapping/mapping")

let wrapper = new require(`./providers/${process.env.PROVIDER}`);
let provider = new wrapper[process.env.PROVIDER]();

console.log(provider)



app.get("/watch/:name", async (req,res, next) =>{

    //const url = await provider.getLink(2);
    let {name} = req.params;
    name = name.trim();
    console.log(name)
    name = name.slice(0,-5)
    const channel = channelMapping[name];
    if(!channel){
        return res.status(404).send();
    }
    const channelId = channel[process.env.PROVIDER];
    if(!channelId){
        return res.status(404).send();
    }
    const url = await provider.getLink(channelId);

    res.redirect(url)
})

app.use((err, req, res, next) => {
  return res.status(500).send();
});


app.listen(process.env.PORT || 3000, (req,res) => {
})