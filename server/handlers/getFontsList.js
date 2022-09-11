const {makeFontsList} = require("../utils/makeFontsList")

const getFontsList = async (request, response) => {
    const list = await makeFontsList()
    response.json(list);
}

module.exports = {getFontsList}