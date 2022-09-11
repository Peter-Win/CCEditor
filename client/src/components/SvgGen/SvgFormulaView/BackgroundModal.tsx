import * as React from "react";
import { observer } from "mobx-react-lite";
import { Alert, Button, Input, Modal, Tooltip } from "antd";
import { BgColorsOutlined } from "@ant-design/icons";
import { PropsEditorStore } from "../PropsEditor";

interface PropsBackgroundModal {
  store: PropsEditorStore;
}

export const BackgroundModal: React.FC<PropsBackgroundModal> = observer(({ store }: PropsBackgroundModal) => {
  const {bgColor=""} = store.commonSettings;
  const [open, setOpen] = React.useState(false);
  const [color, setColor] = React.useState(bgColor);
  const onOk = () => {
    store.updateSettings({ bgColor: color || undefined});
    setOpen(false);
  };
  return <>
      <Tooltip title="Background color" placement="topRight">
        <Button icon={<BgColorsOutlined />} onClick={() => {
          setColor(bgColor);
          setOpen(true);
        }} />
      </Tooltip>
      <Modal
        title="Background color"
        visible={open}
        onCancel={() => setOpen(false)}
        onOk={onOk}
        destroyOnClose
      >
        <Alert showIcon type="warning" message="This color is not part of the SVG image. Used for viewing purposes only." />
        <div style={{backgroundColor: color || "white", height: 40, margin: "1rem 0"}} />
        <Input
          value={color}
          onChange={e => setColor(e.currentTarget.value)}
          onPressEnter={onOk}
          allowClear 
        />
      </Modal>
  </>;
});