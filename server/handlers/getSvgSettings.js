const { makeDataFileName } = require("../utils/access");
const { isFileExists } = require("../utils/isFileExists");

const getSvgSettings = async (request, response) => {
    const fname = makeDataFileName("svgSettings.json")
    if (await isFileExists(fname)) {
        response.sendFile(fname)
    } else {
        response.json({});
    }
}

module.exports = {getSvgSettings}