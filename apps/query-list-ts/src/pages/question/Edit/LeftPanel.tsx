import { AppstoreAddOutlined, BarsOutlined } from "@ant-design/icons";
import { Tabs } from "antd";
import type { FC } from "react";
import Lib from "./Lib";
import Layers from "./Layer ";

const LeftPanel: FC = () => {
  const tabsItem = [
    {
      key: "componentLib",
      label: (
        <span>
          <AppstoreAddOutlined />
          组件库
        </span>
      ),
      children: <Lib />,
    },
    {
      key: "layers",
      label: (
        <span>
          <BarsOutlined />
          图层
        </span>
      ),
      children: <Layers />,
    },
  ];

  return <Tabs items={tabsItem} defaultActiveKey="componentLib" />;
};

export default LeftPanel;
