import * as React from "react";
import { observer } from "mobx-react-lite";
import { Form, Input, Select } from "antd";
import { InputNumberOpt } from "src/components/InputNumberOpt";
import { PropsEditorStore } from "../PropsEditorStore";
import styles from "./PropsList.module.less";

interface PropsPropsList {
  store: PropsEditorStore;
}

export const PropsList: React.FC<PropsPropsList> = observer(
  ({ store }: PropsPropsList) => {
    const { propsList } = store;
    if (!propsList) return null;
    return (
      <div className={styles.propsList}>
        <table>
          <thead>
            <tr>
              <th>Property</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {propsList.map(({ key, dstValue, srcValue }) => (
              <tr key={key}>
                <td>{key in propDict ? `${key}: ${propDict[key]}` : key}</td>
                <td>
                  {typeof dstValue === "string" && (
                    <Input
                      size="small"
                      value={srcValue as string}
                      placeholder={String(dstValue)}
                      onChange={({ currentTarget: { value } }) => {
                        /* Здесь важно, что пустая строка воспринимается как undefined */
                        store.setImgProp(key, value || undefined);
                      }}
                      allowClear
                    />
                  )}
                  {typeof dstValue === "number" && (
                    <InputNumberOpt
                      size="small"
                      value={srcValue as number | undefined}
                      placeholder={String(dstValue)}
                      onChange={(v) => store.setImgProp(key, v)}
                    />
                  )}
                  {typeof dstValue === "boolean" && (
                    <Select
                      size="small"
                      allowClear
                      options={boolOptions}
                      value={srcValue}
                      placeholder={dstValue ? "Yes" : "No"}
                      onChange={(v) => store.setImgProp(key, v)}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
);

const boolOptions = [
  { label: "Yes", value: true },
  { label: "No", value: false },
];

const propDict: Record<string, string> = {
  line: "Standard bond length",
  lineWidth: "The width of the standard bond",
};
