import * as React from "react";
import { observer } from "mobx-react-lite";
import { Layout, Menu } from "antd";
import { FileImageOutlined, HomeOutlined } from "@ant-design/icons";
import {
  FormulaInputBox,
  formulaInputBoxStore,
} from "./components/FormulaInputBox";
import { ErrorInfo } from "./components/ErrorInfo";
import { appStore } from "./appStore";
import { SvgGen } from "./components/SvgGen";
import { RightMenu } from "./components/RightMenu";
import { StandardInfoBox } from "./components/StandardInfoBox";

const { Content, Header, Footer } = Layout;

export const MainFrame: React.FC = observer(() => {
  const inputBox = React.useRef<HTMLTextAreaElement | null>(null);
  React.useEffect(() => {
    if (inputBox.current) inputBox.current.focus();
  }, []);
  return (
    <Layout className="main-layout">
      <Header style={{ background: "white", padding: "0 10px" }}>
        <div className="header-line">
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
          <RightMenu />
        </div>
      </Header>
      <Layout>
        <Content style={{ padding: "0.5em" }}>
          <FormulaInputBox store={formulaInputBoxStore} ref={inputBox} />
          <ErrorInfo store={formulaInputBoxStore} />
          {appStore.curPage === "std" && (
            <StandardInfoBox store={formulaInputBoxStore} />
          )}
          {appStore.curPage === "svg" && <SvgGen />}
        </Content>
      </Layout>
      <Footer />
    </Layout>
  );
});
