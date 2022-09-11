import * as React from "react";
import { hot } from "react-hot-loader/root";
import { ConfigProvider } from "antd";
// import ru from 'antd/lib/locale/ru_RU';
import en from "antd/lib/locale/en_GB";
import { MainFrame } from "./MainFrame";
import "./style.less";
import "./charchem.css";

const App: React.FC = () => (
  <React.StrictMode>
    <ConfigProvider locale={en}>
      <MainFrame />
    </ConfigProvider>
  </React.StrictMode>
);

export default hot(App);
