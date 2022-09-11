const fs = require('fs')
const { makeDataFileName } = require('../utils/access')

// Чтобы пользователь мог скачать текущее svg-изображение,
// нужно это изображение сначала закачать с клиента на сервер.
// И уже затем можно будет использовать функцию браузера для скачивания.

const svgUpload = async (request, response, next) => {
    if (!request.body) {
        return next(new Error("Empty body"))
    }
    const fileName = makeDataFileName('lastUpload.svg')
    await fs.promises.writeFile(fileName, request.body, {encoding: 'utf-8'})
    response.end()
}

module.exports = {svgUpload}