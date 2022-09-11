import * as React from "react";
import { observer } from "mobx-react-lite";
import { Layout, Menu } from "antd";
import { FileImageOutlined, HomeOutlined } from "@ant-design/icons";
import {
  FormulaInputBox,
  formulaInputBoxStore,
} from "./components/FormulaInputBox";
import { ErrorInfo } from "./components/ErrorInfo";
import { TextFormatView } from "./components/TextFormatView";
import { FormulaDefaultView } from "./components/FormulaDefaultView";
import { appStore } from "./appStore";
import { SvgGen } from "./components/SvgGen";

const { Content, Header, Sider, Footer } = Layout;

export const MainFrame: React.FC = observer(() => {
  const inputBox = React.useRef<HTMLTextAreaElement | null>(null);
  React.useEffect(() => {
    if (inputBox.current) inputBox.current.focus();
  }, []);
  return (
    <Layout className="main-layout">
      <Header style={{ padding: 0 }}>
        <Menu
          mode="horizontal"
          onClick={({ key }) => appStore.setCurPage(key)}
          selectedKeys={[appStore.curPage]}
        >
          <Menu.Item key="std" icon={<HomeOutlined />}>
            Standard tools
          </Menu.Item>
          <Menu.Item key="svg" icon={<FileImageOutlined />}>
            SVG generation
          </Menu.Item>
        </Menu>
      </Header>
      <Layout>
        <Content style={{ padding: "0.5em" }}>
          <FormulaInputBox store={formulaInputBoxStore} ref={inputBox} />
          <ErrorInfo store={formulaInputBoxStore} />
          {appStore.curPage === "std" && (
            <>
              <FormulaDefaultView store={formulaInputBoxStore} />
              <TextFormatView store={formulaInputBoxStore} />
            </>
          )}
          {appStore.curPage === "svg" && <SvgGen />}
        </Content>
      </Layout>
      <Footer />
    </Layout>
  );
});
