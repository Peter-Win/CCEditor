const { makeFullFontName } = require("../utils/access")

const loadFont = async (request, response) => {
    const {name} = request.params
    const fullName = makeFullFontName(name)
    response.sendFile(fullName, {headers: {'content-type': 'text/plain'}})
}

module.exports = {loadFont}