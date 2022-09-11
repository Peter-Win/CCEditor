import * as React from "react";
import { observer } from "mobx-react-lite";
import { chemImgStylesMap } from "src/utils/chemImgStylesMap";
import { Input } from "antd";
import { InputNumberOpt } from "src/components/InputNumberOpt";
import styles from "./StylesList.module.less";
import { PropsEditorStore } from "../PropsEditorStore";
import { InputFontHeight } from "./InputFontHeight";
import { SelectLocalFont } from "./SelectLocalFont";

interface PropsStylesList {
  store: PropsEditorStore;
}

export const StylesList: React.FC<PropsStylesList> = observer(
  ({ store }: PropsStylesList) => (
    <div className={styles.stylesList}>
      <div className={styles.stylesListBox}>
        <b>Style</b>
        <b>Font</b>
        <b>Size</b>
        <b>Color</b>

        {store.flatStylesList.map(({ id, fontName, size, color }) => (
          <React.Fragment key={id || "std"}>
            <div>{id ? chemImgStylesMap[id] : "Default"}</div>
            <div>
              <SelectLocalFont
                value={fontName}
                onChange={(v) => store.setLocalFont(id, v)}
                loadedFontNames={store.loadedFontNames}
              />
            </div>
            <div>
              <InputNumberOpt
                value={size}
                size="small"
                onChange={(v?: number) => store.setStyleHeight(id, v)}
              />
            </div>
            <div>
              <Input
                value={color}
                allowClear
                size="small"
                onChange={(e) => store.setStyleColor(id, e.currentTarget.value)}
              />
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  )
);
