import { Select } from "antd";
import * as React from "react";
import styles from "./SelectLocalFont.module.less";

interface PropsSelectLocalFont {
  value: string;
  onChange(newValue: string): void;
  loadedFontNames: string[];
}

export const SelectLocalFont: React.FC<PropsSelectLocalFont> = ({
  value,
  onChange,
  loadedFontNames,
}: PropsSelectLocalFont) => (
  <div className={styles.selectLocalFont}>
    <Select
      value={value}
      allowClear
      size="small"
      style={{ width: "100%" }}
      onChange={(v) => onChange(v)}
    >
      {loadedFontNames.map((s) => (
        <Select.Option key={s} value={s}>
          {s}
        </Select.Option>
      ))}
    </Select>
  </div>
);
