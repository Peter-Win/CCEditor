const path = require("path")

const getDataPath = () => path.normalize(path.join(__dirname, "..", "data"))

const getFontsPath = () => path.normalize(path.join(__dirname, "..", "fonts"))

const getSvgPresetsName = () => path.join(getDataPath(), "svgPresets.json")

const makeFullFontName = (shortName) => path.join(getFontsPath(), `${shortName}.svg`)

const makeDataFileName = (shortName) => path.join(getDataPath(), shortName)

module.exports = {getDataPath, getFontsPath, getSvgPresetsName, makeFullFontName, makeDataFileName}