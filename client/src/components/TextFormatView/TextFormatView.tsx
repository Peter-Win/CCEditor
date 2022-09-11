import * as React from "react";
import { observer } from "mobx-react-lite";
import { isTextFormula } from "charchem/inspectors/isTextFormula";
import { makeTextFormula } from "charchem/inspectors/makeTextFormula";
import { rulesHtml } from "charchem/textRules/rulesHtml";

import { Alert } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { FormulaInputBoxStore } from "../FormulaInputBox";
import styles from "./TextFormatView.module.less";

interface PropsTextFormatView {
  store: FormulaInputBoxStore;
}

export const TextFormatView: React.FC<PropsTextFormatView> = observer(
  ({ store }: PropsTextFormatView) => {
    const { expr } = store;
    if (!expr || !expr.isOk()) return null;
    if (!isTextFormula(expr)) {
      return (
        <Alert
          message="The formula cannot be displayed in text format"
          type="warning"
          showIcon
        />
      );
    }

    const code = makeTextFormula(expr, rulesHtml);

    return (
      <div className={styles.textFormatView}>
        <label>HTML</label>
        <TextArea value={code} />
      </div>
    );
  }
);
