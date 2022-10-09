import * as React from "react";
import { Button, Menu, MenuProps, Popover } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import styles from "./RightMenu.module.less";
import { AboutModal } from "./AboutModal";
import { FlagIcon } from "../FlagIcon";

const items = [{ label: "About...", key: "about" }];

export const RightMenu: React.FC = () => {
  const [about, setAbout] = React.useState(false);
  const closeAbout = React.useCallback(() => {
    setAbout(false);
  }, []);
  const onMenu = ({ key }: { key: string }) => {
    if (key === "about") {
      setAbout(true);
    }
  };
  const content = <Menu mode="vertical" items={items} onClick={onMenu} />;
  return (
    <div className={styles.rightMenu}>
      <Popover content={content} placement="bottomRight">
        <MoreOutlined />
      </Popover>
      <AboutModal visible={about} close={closeAbout} />
    </div>
  );
};
