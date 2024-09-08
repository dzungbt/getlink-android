const express = require("express");
const router = express.Router({ mergeParams: true });
const { relayChannelRequest } = require("../controllers/watch.js")

router.get("/:name", relayChannelRequest)



module.exports = router