const path = require("path")
const fs = require("fs");
const { getFontsPath } = require("./access");

const makeFontsList = async () => {
    const fontsPath = getFontsPath()
    const list = await fs.promises.readdir(fontsPath)
    const info = await Promise.all(
        list.map(fname => fs.promises.stat(path.join(fontsPath, fname)))
    )
    const result = list.map((shortName, i) => ({
        shortName: shortName.split('.').slice(0, -1).join('.'),
        fullName: path.join(fontsPath, shortName),
        size: info[i].size,
    }));
    const stdName = "cambria-regular";
    const stdItem = result.find(({shortName}) => shortName.toLowerCase() === stdName) || result[0]
    if (stdItem) stdItem.std = true
    result.sort((a, b) => a.shortName.localeCompare(b.shortName));
    return result
}

module.exports = {makeFontsList}