import * as React from "react";
import { observer } from "mobx-react-lite";
import { Spin } from "antd";
import { PropsEditorStore } from "../PropsEditor";
import styles from "./SvgFormulaView.module.less";
import { SvgFormulaToolbox } from "./SvgFormulaToolbox";

interface PropsSvgFormulaView {
  store: PropsEditorStore;
}

const scaleParam = (
  src: string,
  param: "width" | "height",
  zoom?: number
): string => {
  if (!zoom) return src;
  const rx = new RegExp(`${param}="([\\d\\.]+)px"`);
  const res = rx.exec(src);
  if (!res) return src;
  const value = +res[1]!;
  if (Number.isNaN(value)) return src;
  const newValue = value * zoom;
  return src.replace(rx, `${param}="${newValue}px"`);
};

const zoomSvg = (src: string, zoom?: number): string =>
  scaleParam(scaleParam(src, "width", zoom), "height", zoom);

export const SvgFormulaView: React.FC<PropsSvgFormulaView> = observer(
  ({ store }: PropsSvgFormulaView) => {
    const { zoom, bgColor = "white" } = store.commonSettings;
    const ref = React.useRef<HTMLDivElement>(null);
    if (ref.current) ref.current.innerHTML = zoomSvg(store.svgText, zoom);
    return (
      <div
        className={styles.svgFormulaView}
        style={{ backgroundColor: bgColor }}
      >
        <SvgFormulaToolbox store={store} />
        <Spin spinning={store.isBusy} size="large">
          <div ref={ref} />
        </Spin>
      </div>
    );
  }
);
