import * as React from "react";
import { observer } from "mobx-react-lite";
import { Button, Input, Tooltip } from "antd";
import { QuestionCircleOutlined, SearchOutlined } from "@ant-design/icons";
import { FormulaInputBoxStore } from "./FormulaInputBoxStore";
import styles from "./FormulaInputBox.module.less";
import { BlockHeader } from "../BlockHeader";
import {
  AskCompoundsModal,
  askCompoundsModalStore,
} from "../AskCompoundsModal";

interface PropsFormulaInputBox {
  store: FormulaInputBoxStore;
}

export const FormulaInputBox = observer(
  React.forwardRef(
    (
      { store }: PropsFormulaInputBox,
      ref: React.ForwardedRef<HTMLTextAreaElement>
    ) => {
      React.useEffect(() => store.init(), []);
      return (
        <div className={styles.formulaInputBox}>
          <div className={styles.above}>
            <BlockHeader text="Enter a text description of the formula:" />
            <Tooltip
              title="How to describe the formula"
              placement="bottomRight"
            >
              <Button
                type="link"
                href="http://charchem.org/en/rules"
                target="_blank"
                icon={<QuestionCircleOutlined />}
              />
            </Tooltip>
            <Tooltip
              title="Search for compound formulas"
              placement="bottomRight"
            >
              <Button
                icon={<SearchOutlined />}
                onClick={() =>
                  askCompoundsModalStore.activate((code) =>
                    store.insertFormula(code)
                  )
                }
              />
            </Tooltip>
          </div>
          <Input.TextArea
            ref={ref}
            onChange={(e) => store.setFormula(e.currentTarget.value)}
            value={store.formula}
            allowClear
          />
          <AskCompoundsModal store={askCompoundsModalStore} />
        </div>
      );
    }
  )
);
