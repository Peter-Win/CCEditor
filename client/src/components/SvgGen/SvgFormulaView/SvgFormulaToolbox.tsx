import * as React from "react";
import { observer } from "mobx-react-lite";
import { FloadToolbox } from "src/components/FloadToolbox";
import { Button, Space, Tooltip } from "antd";
import {
  AimOutlined,
  BgColorsOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
} from "@ant-design/icons";
import { is0 } from "charchem/math";
import { PropsEditorStore } from "../PropsEditor";
import { BackgroundModal } from "./BackgroundModal";

interface PropsSvgFormulaToolbox {
  store: PropsEditorStore;
}

const zoomScale = (
  srcZoom: number | undefined,
  k: number
): number | undefined => {
  const srcValue: number = srcZoom ?? 1;
  const dstValue = srcValue * k;
  return is0(dstValue - 1) ? undefined : dstValue;
};

const onZoom = (store: PropsEditorStore, k: number) => {
  const {
    commonSettings: { zoom },
  } = store;
  store.updateSettings({ zoom: zoomScale(zoom, k) });
};

const toPerc = (zoom?: number): string => {
  if (zoom === undefined) return "100%";
  return `${Math.round(zoom * 100)}%`;
};

export const SvgFormulaToolbox: React.FC<PropsSvgFormulaToolbox> = observer(
  ({ store }: PropsSvgFormulaToolbox) => {
    const {
      commonSettings: { zoom },
    } = store;
    return (
      <FloadToolbox>
        <Space>
          <span style={{ background: "#FFF", padding: 6, borderRadius: 5 }}>
            {toPerc(zoom)}
          </span>
          {!!zoom && (
            <Tooltip title="Reset to original size">
              <Button
                icon={<AimOutlined />}
                onClick={() => store.updateSettings({ zoom: undefined })}
              />
            </Tooltip>
          )}
          <Tooltip title="Zoom in">
            <Button
              icon={<ZoomInOutlined />}
              onClick={() => onZoom(store, 1.2)}
            />
          </Tooltip>
          <Tooltip title="Zoom out">
            <Button
              icon={<ZoomOutOutlined />}
              onClick={() => onZoom(store, 1 / 1.2)}
            />
          </Tooltip>
          <BackgroundModal store={store} />
        </Space>
      </FloadToolbox>
    );
  }
);
