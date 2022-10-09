const path = require('path')

const web = async (request, response) => {
    const {originalUrl} = request 
    const shortName = originalUrl === '/' ? '/index.html' : originalUrl;
    const fullName = path.normalize(path.join(__dirname, '..', '..', 'client', 'dist', shortName))
    response.sendFile(fullName)
}

module.exports = {web}