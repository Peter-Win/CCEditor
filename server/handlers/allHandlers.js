const { deletePreset } = require("./deletePreset")
const { getFontsList } = require("./getFontsList")
const { getSvgPresets } = require("./getSvgPresets")
const { getSvgSettings } = require("./getSvgSettings")
const { lastSvgDownload } = require("./lastSvgDownload")
const { loadFont } = require("./loadFont")
const { postSvgPresets } = require("./postSvgPresets")
const { postSvgSettings } = require("./postSvgSettings")
const { svgUpload } = require("./svgUpload")

const allHandlers = (app) => {
    app.get('/api/font/:name', loadFont)
    app.get('/api/getFontsList', getFontsList)
    app.get('/api/getSvgPresets', getSvgPresets)
    app.get('/api/getSvgSettings', getSvgSettings)
    app.delete('/api/preset/:index', deletePreset)
    app.post('/api/svgUpload', svgUpload)
    app.post('/api/setSvgPresets', postSvgPresets)
    app.post('/api/setSvgSettings', postSvgSettings)
    app.get('/svgDownload', lastSvgDownload)

    app.all('/api/*', (req, res, next) => next(new Error(`Invalid request ${req.url}`)))
}

module.exports = {allHandlers}