import * as React from "react";
import { observer } from "mobx-react-lite";
import { Alert, Spin } from "antd";
import styles from "./SvgGen.module.less";
import { PropsEditor, propsEditorStore } from "./PropsEditor";
import { SvgTextView } from "./SvgTextView";
import { formulaInputBoxStore } from "../FormulaInputBox";
import { SvgFormulaView } from "./SvgFormulaView";

export const SvgGen: React.FC = observer(() => {
  React.useEffect(() => {
    propsEditorStore.init(() => {
      const { expr } = formulaInputBoxStore;
      if (expr) propsEditorStore.build(expr);
    });
  }, []);
  React.useEffect(() => {
    const { expr } = formulaInputBoxStore;
    if (expr && expr.isOk()) propsEditorStore.build(expr);
  }, [formulaInputBoxStore.expr?.src0, propsEditorStore.imgProps]);
  if (propsEditorStore.status === "error") {
    return (
      <Alert
        type="error"
        message="Data loading error"
        description={propsEditorStore.errorInfo}
        showIcon
      />
    );
  }
  return (
    <Spin size="large" spinning={propsEditorStore.isLoading}>
      <div className={styles.svgGen}>
        <div className={styles.view}>
          <SvgFormulaView store={propsEditorStore} />
        </div>
        <div className={styles.props}>
          <PropsEditor store={propsEditorStore} />
        </div>
        <div className={styles.text}>
          <SvgTextView store={propsEditorStore} />
        </div>
      </div>
    </Spin>
  );
});
