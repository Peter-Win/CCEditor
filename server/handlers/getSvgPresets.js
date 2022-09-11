const fs = require("fs")
const { getSvgPresetsName } = require("../utils/access")
const { isFileExists } = require("../utils/isFileExists")
const { makeFontsList } = require("../utils/makeFontsList")

// Загрузка сразу всех пресетов.
// Если пресетов нет, то создается дефолтный вариант.
// То есть, всегда есть хотя бы один пресет в списке.
// Формат пресета: PortablePreset

const getSvgPresets = async (request, response) => {
    const fname = getSvgPresetsName()
    let data;
    if (await isFileExists(fname)) {
        const text = await fs.promises.readFile(fname, {encoding: "utf-8"});
        data = JSON.parse(text)
    } else {
        const fonts = await makeFontsList()
        const curFont = fonts.find(f => f.std) || fonts[0];
        data = [
            {
                name: "Default",
                current: true,
                stdStyle: {
                    fontName: curFont.shortName,
                    size: 0,
                },
                styles: {},
                props: {},
            }
        ]
    }
    response.json(data);
}

module.exports = {getSvgPresets}