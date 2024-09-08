
const {channelMapping} = require("../mapping/mapping")



module.exports.relayChannelRequest = async (req, res, next) => {
    try {
        let { name } = req.params;
        name = name.trim();
        console.log(name)
        name = name.slice(0, -5)
        const channel = channelMapping[name];
        if (!channel) {
            return res.status(404).send();
        }
        const channelId = channel[process.env.PROVIDER];
        if (!channelId) {
            return res.status(404).send();
        }
        const url = await global.provider.getLink(channelId);

        res.redirect(url)
    } catch (e) {
        next(e);
    }
}