import { ChemImgProps, TextProps } from "charchem/drawSys/ChemImgProps";
import { ChemStyleId } from "charchem/drawSys/ChemStyleId";
import { makeAutoObservable } from "mobx";
import { FontFileInfo } from "src/types/FontFileInfo";
import { LoadingStatus } from "src/types/LoadingStatus";
import {
  clonePreset,
  PortablePreset,
  PortablePresetProp,
  PortablePresetStyle,
} from "src/types/PortablePreset";
import { chemImgStylesMap } from "src/utils/chemImgStylesMap";
import { SvgFont } from "charchem/drawSys/portableFonts/svgFont/SvgFont";
import { SvgSurfacePortable } from "charchem/drawSys/svg/SvgSurfacePortable";
import { ChemExpr } from "charchem/core/ChemExpr";
import { buildExpression } from "charchem/structBuilder/buildExpression";
import { renderTopFrame } from "charchem/drawSys/figures/renderTopFrame";
import { standaloneExportOptions } from "charchem/drawSys/svg/standaloneExportOptions";
import { notification } from "antd";
import { verifyPresets } from "src/utils/verifyPresets";
import { extractPortableProps } from "src/utils/extractPortableProps";
import { SvgCommonSettings } from "src/types/SvgCommonSettings";
import { debounce, DebounceCounter } from "src/utils/debounce";

interface FontItem extends FontFileInfo {
  status: LoadingStatus;
  error?: Error;
  font?: SvgFont;
}

interface PortablePropItem {
  key: string;
  dstValue: PortablePresetProp; // after new ChemImgProps, init(). Always valid value.
  srcValue?: PortablePresetProp; // from curPreset. Can be undefined
}

const presetStub = {} as PortablePreset;

const counterUpdateSettings: DebounceCounter = {};
const counterSavePresets: DebounceCounter = {};

const postJson = <T>(url: string, data: T) => {
  fetch(url, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).catch((e) =>
    notification.error({ message: "Save Error", description: e.message })
  );
};

const savePresets = (presets: PortablePreset[]) => {
  debounce(counterSavePresets, 500, () =>
    postJson("/api/setSvgPresets", presets)
  );
};

export class PropsEditorStore {
  constructor() {
    makeAutoObservable(this);
  }

  // common settings
  commonSettings: SvgCommonSettings = {};

  initSettings(settings: SvgCommonSettings) {
    this.commonSettings = settings;
  }

  updateSettings(settings: Partial<SvgCommonSettings>) {
    this.commonSettings = { ...this.commonSettings, ...settings };
    debounce(counterUpdateSettings, 500, () =>
      postJson("/api/setSvgSettings", this.commonSettings)
    );
  }

  // Текущая вкладка
  tab: string = "fonts";

  setTab(newTab: string) {
    this.tab = newTab;
  }

  // Общий признак загрузки
  status: LoadingStatus = "none";

  setStatus(newStatus: LoadingStatus) {
    this.status = newStatus;
  }

  get isLoading(): boolean {
    return this.status === "load";
  }

  // Критическая Ошибка
  errorInfo: string = "";

  setError(e: Error) {
    this.setStatus("error");
    this.errorInfo = e.message;
  }

  // Список шрифтов
  fonts: FontItem[] = [];

  setFonts(newList: FontItem[]) {
    this.fonts = newList;
  }

  changeFontStatus(fontName: string, newStatus: LoadingStatus) {
    const item = this.fonts.find(({ shortName }) => shortName === fontName);
    if (item) {
      item.status = newStatus;
      if (newStatus === "none") {
        item.font = undefined; // unload
      } else if (newStatus === "load") {
        this.loadFont(item);
      }
    }
  }

  // Имена шрифтов, используемых текущим пресетом.
  get usedFontNames(): Set<string> {
    const preset = this.curPreset;
    const names: Set<string> = new Set([preset.stdStyle.fontName]);
    Object.values(preset.styles).forEach(({ fontName }) => {
      if (fontName) names.add(fontName);
    });
    return names;
  }

  // Список шрифтов, используемых текущим пресетом
  get usedFonts(): FontItem[] {
    const names = this.usedFontNames;
    return this.fonts.filter(({ shortName }) => names.has(shortName));
  }

  get loadedFonts(): FontItem[] {
    return this.fonts.filter(({ status }) => status === "ready");
  }

  get loadedFontNames() {
    return this.loadedFonts.map(({ shortName }) => shortName);
  }

  get loadedFontsSize(): number {
    return this.loadedFonts.reduce((sum, item) => sum + item.size, 0);
  }

  // Пресеты
  presets: PortablePreset[] = [];

  setPresets(newList: PortablePreset[]) {
    this.presets = newList;
  }

  cloneCurPreset(newName: string) {
    const newPreset = clonePreset(this.curPreset);
    newPreset.name = newName;
    this.curPreset.current = false;
    newPreset.current = true;
    this.presets.push(newPreset);
    this.presets.sort((a: PortablePreset, b: PortablePreset) =>
      a.name.localeCompare(b.name)
    );
    savePresets(this.presets);
  }

  get curPreset(): PortablePreset {
    return (
      this.presets.find(({ current }) => current) ??
      this.presets[0] ??
      presetStub
    );
  }

  setCurPreset(presetName: string) {
    const old = this.presets.find(({ current }) => current);
    const desired = this.presets.find(({ name }) => name === presetName);
    if (!desired || (old && old === desired)) return;
    if (old) {
      old.current = false;
    }
    desired.current = true;
    this.updateFonts();
    savePresets(this.presets);
  }

  deletePreset(index: number) {
    this.presets.splice(index, 1);
    savePresets(this.presets);
  }

  // Стили
  get flatStylesList(): PortablePresetStyle[] {
    const { curPreset } = this;
    const { styles } = curPreset;
    const list: PortablePresetStyle[] = [
      { ...curPreset.stdStyle },
      ...Object.keys(chemImgStylesMap).map(
        (id) => styles[id] ?? { id: id as ChemStyleId, fontName: "" }
      ),
    ];
    return list;
  }

  setStyleHeight(id?: ChemStyleId, value?: number): void {
    const { curPreset } = this;
    if (!id) {
      curPreset.stdStyle.size = value;
    } else {
      if (!curPreset.styles[id]) {
        curPreset.styles[id] = { id, fontName: "" };
      }
      curPreset.styles[id]!.size = value;
    }
    savePresets(this.presets);
  }

  setLocalFont(id: ChemStyleId | undefined, name: string) {
    const { curPreset } = this;
    if (!id) {
      if (name) curPreset.stdStyle.fontName = name;
    } else {
      if (!curPreset.styles[id]) {
        curPreset.styles[id] = { id, fontName: "" };
      }
      curPreset.styles[id]!.fontName = name;
    }
    savePresets(this.presets);
  }

  setStyleColor(id?: ChemStyleId, color?: string) {
    const { curPreset } = this;
    if (!id) {
      curPreset.stdStyle.color = color;
    } else {
      if (!curPreset.styles[id]) {
        curPreset.styles[id] = { id, fontName: "" };
      }
      curPreset.styles[id]!.color = color;
    }
    savePresets(this.presets);
  }

  // Props list
  get propsList(): PortablePropItem[] | undefined {
    const { imgProps, curPreset } = this;
    if (!imgProps || !curPreset) return undefined;
    const dictReal = extractPortableProps(imgProps);
    const list = Object.entries(dictReal).map(([key, dstValue]) => ({
      key,
      dstValue,
      srcValue: curPreset.props[key],
    }));
    list.sort((a, b) => a.key.localeCompare(b.key));
    return list;
  }

  setImgProp(propName: string, value: PortablePresetProp | undefined) {
    const { curPreset } = this;
    if (!curPreset) return;
    if (value === undefined) {
      delete curPreset.props[propName];
    } else {
      curPreset.props[propName] = value;
    }
    savePresets(this.presets);
  }

  get surface(): SvgSurfacePortable | undefined {
    const { curPreset } = this;
    const stdName = curPreset.stdStyle?.fontName;
    if (!stdName) return undefined;
    const fontInfo = this.fonts.find(({ shortName }) => shortName === stdName);
    if (!fontInfo) return undefined;
    const { font } = fontInfo;
    if (!font) return undefined;
    const result = new SvgSurfacePortable(font);
    // Добавить шрифты
    const fontNames = Object.values(curPreset.styles)
      .map(({ fontName }) => fontName)
      .filter((name) => !!name);
    const shortFontNames = Array.from(new Set(fontNames));
    // Не оптимальный поиск. Но шрифтов не должно быть много.
    shortFontNames.forEach((name) => {
      const fontInfo = this.fonts.find(({ shortName }) => shortName === name);
      const font = fontInfo?.font;
      if (font) result.addGlbFont(name, font);
    });
    return result;
  }

  get imgProps(): ChemImgProps | undefined {
    const { isLoading, curPreset, surface } = this;
    if (isLoading || !surface || !curPreset) return undefined;
    const stdStyle: TextProps = makeTextProps(surface, curPreset.stdStyle, {
      fontName: "",
    });
    const props = new ChemImgProps(stdStyle);
    Object.values(curPreset.styles).forEach((pps) => {
      if (pps.id)
        props.styles[pps.id] = makeTextProps(surface, pps, curPreset.stdStyle);
    });
    Object.entries(curPreset.props).forEach(([key, value]) => {
      // @ts-ignore
      props[key] = value;
    });
    props.init();
    return props;
  }

  svgText: string = "";

  build(expr: ChemExpr) {
    try {
      const { surface, imgProps } = this;
      let text: string = "";
      if (surface && imgProps) {
        const { frame } = buildExpression(expr, imgProps);
        renderTopFrame(frame, surface);
        text = surface.exportText({
          width: `${frame.bounds.width}px`,
          height: `${frame.bounds.height}px`,
          ...standaloneExportOptions,
        });
      }
      this.svgText = text;
    } catch (e) {
      notification.error({
        message: "SVG build error",
        description: e.message,
      });
    }
  }

  init(onSuccess?: () => void) {
    const onInit = ([fontsList, presetsList, settings]: [
      FontFileInfo[],
      PortablePreset[],
      SvgCommonSettings
    ]) => {
      this.setFonts(fontsList.map((item) => ({ ...item, status: "none" })));
      this.setPresets(verifyPresets(presetsList));
      this.initSettings(settings);
    };
    if (this.status === "none") {
      this.setStatus("load");
      Promise.all([
        fetch("/api/getFontsList").then((resp) => resp.json()),
        fetch("/api/getSvgPresets").then((resp) => resp.json()),
        fetch("/api/getSvgSettings").then((resp) => resp.json()),
      ])
        .then((resp) => onInit(resp))
        .then(() => {
          this.setStatus("ready");
          this.updateFonts();
          if (onSuccess) onSuccess();
        })
        .catch((e) => this.setError(e));
    }
  }

  // При смене пресета нужно пройти по списку шрифтов. Загрузить нужные и убрать ненужные.
  updateFonts() {
    const names = this.usedFontNames;
    this.fonts.forEach((item) => {
      const { shortName, status } = item;
      if (names.has(shortName)) {
        // Это нужный шрифт
        if (status !== "ready" && status !== "load") {
          this.loadFont(item);
        }
      } else {
        item.status = "none";
        item.font = undefined;
        item.error = undefined;
      }
    });
  }

  loadFont(item: FontItem) {
    item.status = "load";
    item.font = undefined;
    item.error = undefined;
    fetch(`/api/font/${item.shortName}`)
      .then((resp) => resp.text())
      .then((text) => {
        item.font = SvgFont.create(text);
        item.status = "ready";
      })
      .catch((e) => {
        item.status = "error";
        item.error = e;
      });
  }

  // Загрузка основного контента или загрузка любого шрифта
  get isBusy(): boolean {
    const { isLoading, fonts } = this;
    return isLoading || !!fonts.find(({ status }) => status === "load");
  }

  async svgDownload(): Promise<void> {
    const body = this.svgText;
    const res = await fetch("/api/svgUpload", {
      method: "POST",
      body,
    });
    if (res.status !== 200) {
      const msg = await res.text();
      return Promise.reject(new Error(msg));
    }
    window.open("/svgDownload");
  }

  get svgDownloadDisabled(): boolean {
    return !this.svgText;
  }
}

const makeTextProps = (
  surface: SvgSurfacePortable,
  pps: PortablePresetStyle,
  std: PortablePresetStyle
): TextProps => {
  const family = pps.fontName || std.fontName;
  const height = pps.size ?? std.size ?? 100;
  return {
    font: surface.getFont({ family, height }),
    style: { fill: pps.color || std.color || "black" },
  };
};

export const propsEditorStore = new PropsEditorStore();
