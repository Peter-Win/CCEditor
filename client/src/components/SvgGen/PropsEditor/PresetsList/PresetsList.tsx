import * as React from "react";
import { observer } from "mobx-react-lite";
import { Alert, Button, Modal, notification, Radio, Space } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { PropsEditorStore } from "../PropsEditorStore";
import styles from "./PresetsList.module.less";
import { CreateNewPreset } from "./CreateNewPreset";

interface PropsPresetsList {
  store: PropsEditorStore;
}

export const PresetsList: React.FC<PropsPresetsList> = observer(
  ({ store }: PropsPresetsList) => {
    const [removeIndex, setRemoveIndex] = React.useState<number | null>(null);
    return (
      <div className={styles.presetsList}>
        <table className={styles.presetsListBox}>
          <tbody>
            {store.presets.map(({ name, current }, i) => (
              <tr key={name}>
                <td>
                  <Radio
                    checked={!!current}
                    onChange={() => store.setCurPreset(name)}
                  >
                    <span className={current ? styles.curName : ""}>
                      {name}
                    </span>
                  </Radio>
                </td>
                <td>
                  <Button
                    icon={<DeleteOutlined />}
                    disabled={current}
                    onClick={() => setRemoveIndex(i)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Space>
          <CreateNewPreset store={store} />
        </Space>
        <Modal
          title="Delete preset"
          visible={removeIndex !== null}
          onCancel={() => setRemoveIndex(null)}
          okText="Delete"
          okButtonProps={{ danger: true }}
          onOk={() => {
            if (removeIndex !== null) store.deletePreset(removeIndex);
            setRemoveIndex(null);
          }}
        >
          <Alert
            type="warning"
            message={`The preset ${
              removeIndex === null ? "" : store.presets[removeIndex]?.name
            } will be deleted!`}
          />
        </Modal>
      </div>
    );
  }
);
