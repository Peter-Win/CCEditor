import { ChemStyleId } from "charchem/drawSys/ChemStyleId";

export interface PortablePresetStyle {
  id?: ChemStyleId; // undefined for stdStyle
  fontName: string;
  size?: number;
  color?: string;
}

export type PortablePresetProp = string | number | boolean;

export interface PortablePreset {
  name: string;
  current?: boolean;
  stdStyle: PortablePresetStyle;
  styles: Record<string, PortablePresetStyle>;
  props: Record<string, PortablePresetProp>;
}

export const clonePreset = (src: PortablePreset): PortablePreset =>
  JSON.parse(JSON.stringify(src)) as PortablePreset;
