function encodeBase64(inputString) {
    // Create a Uint8Array from the input string
    const uint8Array = new TextEncoder().encode(inputString);

    // Encode the Uint8Array using base64
    const encodedString = btoa(String.fromCharCode.apply(null, uint8Array));

    return encodedString;
}

const { channelMapping } = require("./mapping/mapping")
const channels = {}

for (const [name, val] of Object.entries(channelMapping)) {
    
if (!(name.toLowerCase().includes("vtv") ||name.toLowerCase().includes("vtc") || name.toLowerCase().includes("ons") || name.toLowerCase().includes("htv"))) {
    //if(name.toLowerCase().includes("sctv")) {
        const originalUrl = `http://get.viet-tv.online/watch/${name}.m3u8`
        const newUrl = `http://mumbai1.viet-tv.online/${encodeBase64(originalUrl)}.m3u8`
        channels[name] = newUrl
    }
}
console.log(channels)
