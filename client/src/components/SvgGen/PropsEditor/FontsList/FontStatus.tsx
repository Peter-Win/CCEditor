import { Checkbox, Spin } from "antd";
import * as React from "react";
import { LoadingStatus } from "src/types/LoadingStatus";

interface PropsFontStatus {
  status: LoadingStatus;
  shortName: string;
  usedFontNames: Set<string>;
  onChange(fontName: string, newStatus: LoadingStatus): void;
}

export const FontStatus: React.FC<PropsFontStatus> = ({
  status,
  shortName,
  usedFontNames,
  onChange,
}: PropsFontStatus) => (
  <Spin size="small" spinning={status === "load"}>
    <Checkbox
      checked={status === "ready"}
      disabled={usedFontNames.has(shortName)}
      onClick={() => onChange(shortName, status === "ready" ? "none" : "load")}
    />
  </Spin>
);
