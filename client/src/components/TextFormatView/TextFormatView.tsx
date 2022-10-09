import * as React from "react";
import { observer } from "mobx-react-lite";
import { isTextFormula } from "charchem/inspectors/isTextFormula";
import { makeTextFormula } from "charchem/inspectors/makeTextFormula";
import { rulesHtml } from "charchem/textRules/rulesHtml";

import { Alert, Button, Menu, notification, Tooltip } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { appStore } from "src/appStore";
import { RulesBase } from "charchem/textRules/RulesBase";
import { rulesBB } from "charchem/textRules/rulesBB";
import { rulesText } from "charchem/textRules/rulesText";
import { rulesMhchem } from "charchem/textRules/rulesMhchem";
import { CopyOutlined } from "@ant-design/icons";
import { MhchemView } from "./MhchemView";
import { BlockHeader } from "../BlockHeader";
import styles from "./TextFormatView.module.less";
import { FormulaInputBoxStore } from "../FormulaInputBox";

interface PropsTextFormatView {
  store: FormulaInputBoxStore;
}

interface MenuItem {
  label: string;
  key: string;
  rules: RulesBase;
}

const items: MenuItem[] = [
  { label: "HTML", key: "html", rules: rulesHtml },
  { label: "BB-Code", key: "bb", rules: rulesBB },
  { label: "Text", key: "text", rules: rulesText },
  // TODO: Пока что не удалось правильно
  { label: "Mhchem", key: "mhchem", rules: rulesMhchem },
];

export const TextFormatView: React.FC<PropsTextFormatView> = observer(
  ({ store }: PropsTextFormatView) => {
    const { expr } = store;
    const { textViewMode } = appStore;
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
    const item = items.find(({ key }) => key === textViewMode);
    let code = makeTextFormula(expr, item?.rules ?? rulesHtml);
    if (textViewMode === "mhchem") code = `$\\ce{${code}}$`;

    const copyHtml = () => {
      const { clipboard } = navigator;
      if (clipboard) {
        const type = "text/html";
        const blob = new Blob([code], { type });
        const data = [new ClipboardItem({ [type]: blob })];
        clipboard
          .write(data)
          .then(() => notification.success({ message: "Successful copy" }))
          .catch((e) => notification.error({ message: e.message }));
      } else {
        notification.error({
          message: "Clipboard not supported by current browser",
        });
      }
    };

    return (
      <div className={styles.textFormatView}>
        <BlockHeader text="HTML:" />
        <Menu
          mode="horizontal"
          items={items}
          selectedKeys={[textViewMode]}
          onClick={({ key }) => appStore.setTextViewMode(key)}
        />
        <TextArea value={code} readOnly />
        {textViewMode === "html" && (
          <Tooltip title="Copy to clipboard as HTML" placement="topLeft">
            <Button type="link" icon={<CopyOutlined />} onClick={copyHtml} />
          </Tooltip>
        )}
        {textViewMode === "mhchem" && <MhchemView code={code} />}
      </div>
    );
  }
);
