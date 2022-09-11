import * as React from "react";
import { observer } from "mobx-react-lite";
import { Alert } from "antd";
import { FormulaInputBoxStore } from "../FormulaInputBox";
import styles from "./ErrorInfo.module.less";

interface PropsErrorInfo {
  store: FormulaInputBoxStore;
}

export const ErrorInfo: React.FC<PropsErrorInfo> = observer(
  ({ store }: PropsErrorInfo) => {
    const { expr } = store;
    if (!expr) return null;
    const { error } = expr;
    if (!error) return null;
    return (
      <div className={styles.errorInfo}>
        <Alert
          type="error"
          message="Wrong formula description"
          description={error.message}
          showIcon
        />
      </div>
    );
  }
);
