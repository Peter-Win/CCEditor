const fs = require("fs")
const isFileExists = async (fullName) => {
    try {
        await fs.promises.access(fullName, fs.constants.F_OK)
        return true
    } catch (e) {
        if (e.code === 'ENOENT') {
            return false
        }
        throw e
    }
}

module.exports = {isFileExists}