import * as React from "react";
import { Button, Modal } from "antd";
import { getVersionStr } from "charchem/getVersion";
import { version } from "src/version";
import { ExportOutlined } from "@ant-design/icons";
import styles from "./AboutModal.module.less";

interface PropsAboutModal {
  visible: boolean;
  close(): void;
}

export const AboutModal: React.FC<PropsAboutModal> = ({
  visible,
  close,
}: PropsAboutModal) => (
  <Modal visible={visible} onCancel={close} footer={null}>
    <h2>CharChem Editor</h2>
    <div>made by PeterWin</div>
    <div>CharChem library version: {getVersionStr()}</div>
    <div>Editor version: {version}</div>
    <div>
      <a href="http://charchem.org/" target="_blank" rel="noreferrer">
        CharChem site <ExportOutlined />
      </a>
    </div>
    <div style={{ textAlign: "right" }}>
      <Button type="primary" onClick={close}>
        Close
      </Button>
    </div>
  </Modal>
);
