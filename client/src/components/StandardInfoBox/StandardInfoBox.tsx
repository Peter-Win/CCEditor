import * as React from "react";
import { observer } from "mobx-react-lite";
import { Tag } from "antd";
import { appStore } from "src/appStore";
import { AppSettings } from "src/types/AppSettings";
import { isTextFormula } from "charchem/inspectors/isTextFormula";
import { FormulaDefaultView } from "../FormulaDefaultView";
import { FormulaInputBoxStore } from "../FormulaInputBox";
import { InspectorsResult } from "../InspectorsResult";
import { TextFormatView } from "../TextFormatView";
import styles from "./StandardInfoBox.module.less";
import { BlockHeader } from "../BlockHeader";

const { CheckableTag } = Tag;

interface PropsStandardInfoBox {
  store: FormulaInputBoxStore;
}

export const StandardInfoBox: React.FC<PropsStandardInfoBox> = observer(
  ({ store }: PropsStandardInfoBox) => {
    const { calculatedProps = true, textFormatView = true } = appStore.settings;
    const change = (s: Partial<AppSettings>) => appStore.updateSetting(s);
    return (
      <div className={styles.standardInfoBox}>
        <FormulaDefaultView store={store} />
        <div className={styles.tags}>
          <CheckableTag
            checked={calculatedProps}
            onChange={() => change({ calculatedProps: !calculatedProps })}
          >
            Calculated properties
          </CheckableTag>
          <CheckableTag
            checked={textFormatView}
            onChange={() => change({ textFormatView: !textFormatView })}
          >
            Text format
          </CheckableTag>
        </div>
        {calculatedProps && <InspectorsResult store={store} />}
        {textFormatView && <TextFormatView store={store} />}
      </div>
    );
  }
);
