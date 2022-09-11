const fs = require("fs")

const deletePreset = async (request, response, next) => {
    const index = +request.params.index
    if (isNaN(index) || index < 0) {
        return next(new Error("Invalid index"))
    }
    const fname = getSvgPresetsName()
    const txPresets = await fs.promises.readFile(fname, {encoding: "utf-8"})
    const presets = JSON.parse(txPresets)
    if (!Array.isArray(presets)) {
        return next(new Error("Invalid presets"))
    }
    presets.splice(index, 1)
    await fs.promises.writeFile(fname, JSON.stringify(presets, null, '  '), {encoding: "utf-8"})
    response.end()
}

module.exports = {deletePreset}