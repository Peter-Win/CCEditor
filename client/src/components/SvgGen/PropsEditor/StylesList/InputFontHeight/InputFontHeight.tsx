import { Input } from "antd";
import * as React from "react";
import styles from "./InputFontHeight.module.less";

interface PropsInputFontHeight {
  value?: number;
  onChange: (value: number | undefined) => void;
}

const v2s = (value?: number): string =>
  value === undefined ? "" : String(value);

export const InputFontHeight: React.FC<PropsInputFontHeight> = ({
  value,
  onChange,
}: PropsInputFontHeight) => {
  const [strValue, setStrValue] = React.useState("");
  const [status, setStatus] = React.useState<"error" | undefined>(undefined);
  React.useEffect(() => setStrValue(v2s(value)), [value]);
  const setValidValue = (isValid: boolean, strV: string) => {
    setStrValue(strV);
    setStatus(isValid ? undefined : "error");
  };
  const onValue = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { value: newValue } = e.currentTarget;
    const height: number | undefined = !newValue ? undefined : +newValue;
    const isValid = height === undefined || !Number.isNaN(height);
    if (isValid) {
      onChange(height);
    } else {
      setValidValue(isValid, newValue);
    }
  };
  return (
    <div className={styles.inputFontHeight}>
      <Input
        value={strValue}
        onChange={onValue}
        onBlur={() => setValidValue(true, v2s(value))}
        allowClear
        size="small"
        status={status}
      />
    </div>
  );
};
