import * as React from "react";
import { observer } from "mobx-react-lite";
import { Menu } from "antd";
import { PropsEditorStore } from "./PropsEditorStore";
import styles from "./PropsEditor.module.less";
import { FontsList } from "./FontsList";
import { PresetsList } from "./PresetsList";
import { StylesList } from "./StylesList";
import { PropsList } from "./PropsList";

interface PropsPropsEditor {
  store: PropsEditorStore;
}

export const PropsEditor: React.FC<PropsPropsEditor> = observer(
  ({ store }: PropsPropsEditor) => (
    <div className={styles.propsEditor}>
      <Menu
        mode="horizontal"
        selectedKeys={[store.tab]}
        onClick={({ key }) => store.setTab(key)}
      >
        <Menu.Item key="fonts">Fonts</Menu.Item>
        <Menu.Item key="styles">Styles</Menu.Item>
        <Menu.Item key="props">Properties</Menu.Item>
        <Menu.Item key="presets">Presets</Menu.Item>
      </Menu>
      {store.tab === "fonts" && <FontsList store={store} />}
      {store.tab === "presets" && <PresetsList store={store} />}
      {store.tab === "styles" && <StylesList store={store} />}
      {store.tab === "props" && <PropsList store={store} />}
    </div>
  )
);
