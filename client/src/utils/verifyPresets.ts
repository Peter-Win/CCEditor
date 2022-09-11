import { ChemImgProps } from "charchem/drawSys/ChemImgProps";
import { PortablePreset } from "src/types/PortablePreset";

const stdSize = 40;
const indexScale = 0.7;

export const verifyPresets = (src: PortablePreset[]): PortablePreset[] =>
  src.map((pp) => {
    const res = { ...pp };
    if (!res.stdStyle.size) {
      res.stdStyle.size = stdSize;
      ChemImgProps.getIndexStyles().forEach((id) => {
        if (!res.styles[id])
          res.styles[id] = {
            id,
            size: Math.round(stdSize * indexScale),
            fontName: "",
          };
      });
    }
    return res;
  });
