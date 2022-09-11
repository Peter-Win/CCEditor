import { Input } from "antd";
import { SizeType } from "antd/lib/config-provider/SizeContext";
import * as React from "react";

interface PropsInputNumberOpt {
  name?: string;
  value?: number;
  size?: SizeType;
  placeholder?: string;
  onChange(numValue?: number): void;
}

export const InputNumberOpt: React.FC<PropsInputNumberOpt> = ({
  name,
  value,
  size,
  placeholder,
  onChange,
}: PropsInputNumberOpt) => {
  const [strValue, setStrValue] = React.useState("");
  const [status, setStatus] = React.useState<"error" | undefined>(undefined);
  React.useEffect(() => {
    const s = value === undefined ? "" : String(value);
    if (s !== strValue) {
      setStrValue(s);
      setStatus(undefined);
    }
  }, [value]);
  const onStrValue = React.useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      const s = e.currentTarget.value.trim();
      let newStatus: "error" | undefined;
      if (!s) {
        onChange(undefined);
      } else {
        const numValue = +s;
        if (Number.isNaN(numValue)) {
          newStatus = "error";
        } else {
          onChange(numValue);
        }
      }
      setStatus(newStatus);
      setStrValue(s);
    },
    []
  );

  return (
    <Input
      name={name}
      size={size}
      value={strValue}
      onChange={onStrValue}
      status={status}
      placeholder={placeholder}
      allowClear
    />
  );
};
