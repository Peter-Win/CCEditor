const fs = require('fs')
const { makeDataFileName } = require('../utils/access')

const postSvgPresets = async (request, response, next) => {
    const {body} = request
    if (typeof body !== 'object') {
        return next(new Error("Expected JSON data"))
    }
    const fname = makeDataFileName('svgPresets.json')
    await fs.promises.writeFile(fname, JSON.stringify(body, null, '  '), {encoding: 'utf-8'});
    response.end()
}

module.exports = {postSvgPresets}