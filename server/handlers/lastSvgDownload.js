const { makeDataFileName } = require("../utils/access");

const lastSvgDownload = (request, response) => {
    response.download(makeDataFileName('lastUpload.svg'), 'formula.svg');
}

module.exports = {lastSvgDownload}