import {
  Alert,
  Button,
  Form,
  Input,
  InputRef,
  Modal,
  notification,
  Space,
} from "antd";
import { Rule } from "antd/lib/form";
import * as React from "react";
import { PropsEditorStore } from "../PropsEditorStore";

interface PropsModalNewPreset {
  store: PropsEditorStore;
}

export const CreateNewPreset: React.FC<PropsModalNewPreset> = ({
  store,
}: PropsModalNewPreset) => {
  const [isCreate, setCreate] = React.useState(false);
  const refField = React.useRef<InputRef | null>(null);
  const checkName = (possibleName: string) => {
    const testName = possibleName.trim();
    const res = store.presets.find(({ name }) => name === testName);
    return res
      ? Promise.reject(new Error("This name is already in use"))
      : Promise.resolve();
  };
  const rules: Rule[] = [
    { required: true, message: "Please input name of preset" },
    { validator: (r, v) => checkName(v) },
  ];
  const onCancel = () => setCreate(false);
  return (
    <>
      <Button
        type="primary"
        onClick={() => {
          setCreate(true);
          setTimeout(() => refField?.current?.focus(), 100);
        }}
      >
        Create new preset...
      </Button>
      <Modal
        title="Create a new preset"
        visible={isCreate}
        onOk={() => {
          store.cloneCurPreset("Hello!");
          setCreate(false);
          notification.info({ message: `New preset "A" created from "B"` });
        }}
        onCancel={onCancel}
        footer={null}
        destroyOnClose
      >
        <Form
          layout="vertical"
          onFinish={({ name }: { name: string }) => {
            store.cloneCurPreset(name.trim());
            setCreate(false);
          }}
        >
          <Alert type="info" message={`The new preset will copy the properties from the current: ${store.curPreset.name}`} />          
          <Form.Item
            name="name"
            label="Name of new preset"
            required
            rules={rules}
          >
            <Input ref={refField} />
          </Form.Item>
          <div style={{textAlign: "right"}}>
            <Space>
              <Button onClick={onCancel}>Cancel</Button>
              <Button type="primary" htmlType="submit">
                Create
              </Button>
            </Space>
          </div>
        </Form>
      </Modal>
    </>
  );
};
