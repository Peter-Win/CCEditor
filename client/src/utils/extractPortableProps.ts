import { ChemImgProps } from "charchem/drawSys/ChemImgProps";
import { PortablePresetProp } from "src/types/PortablePreset";

const excludeProps = new Set(["kw"]);

export const extractPortableProps = (
  imgProps: ChemImgProps
): Record<string, PortablePresetProp> => {
  const dict: Record<string, PortablePresetProp> = {};
  Object.keys(imgProps).forEach((s: string) => {
    if (excludeProps.has(s)) return;
    const key = s as keyof ChemImgProps;
    const val = imgProps[key];
    if (
      typeof val === "string" ||
      typeof val === "number" ||
      typeof val === "boolean"
    ) {
      dict[s] = val;
    }
  });
  return dict;
};
