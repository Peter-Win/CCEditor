import * as React from "react";
import { observer } from "mobx-react-lite";
import { Input } from "antd";
import { FormulaInputBoxStore } from "./FormulaInputBoxStore";
import styles from "./FormulaInputBox.module.less";

interface PropsFormulaInputBox {
  store: FormulaInputBoxStore;
}

export const FormulaInputBox = observer(
  React.forwardRef(
    (
      { store }: PropsFormulaInputBox,
      ref: React.ForwardedRef<HTMLTextAreaElement>
    ) => (
      <div className={styles.formulaInputBox}>
        <label>Enter a text description of the formula:</label>
        <Input.TextArea
          ref={ref}
          onChange={(e) => store.setFormula(e.currentTarget.value)}
          value={store.formula}
          allowClear
        />
      </div>
    )
  )
);

/*
export const FormulaInputBox = observer(
  React.forwardRef(
    (
      { store }: PropsFormulaInputBox,
      ref: React.ForwardedRef<HTMLTextAreaElement>
    ) => (
      <div className={styles.formulaInputBox}>
        <label>Enter a text description of the formula:</label>
        <textarea
          ref={ref}
          onChange={(e) => store.setFormula(e.currentTarget.value)}
          value={store.formula}
        />
      </div>
    )
  )
);
*/
