import { type FC } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import styles from "./ManageLayout.module.scss";
import { Button, Divider, message, Space } from "antd";
import {
  BarsOutlined,
  DeleteOutlined,
  PlusOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { createQuestionService } from "../services/question";
import { useRequest } from "ahooks";

const ManageLayout: FC = () => {
  const nav = useNavigate();
  const { pathname } = useLocation();

  const handleNav = (path: string) => {
    nav(path);
  };

  const {
    loading,
    run: handleCreateList,
    // error
  } = useRequest(createQuestionService, {
    manual: true,
    onSuccess(result) {
      nav(`/question/edit/${result!.id || result._id}`);
      message.success("创建成功");
    },
    onError(error) {
      console.error(error);
      message.error("创建失败");
    },
  });

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Space direction="vertical">
          <Button
            type="primary"
            size="large"
            icon={<PlusOutlined />}
            onClick={handleCreateList}
            disabled={loading}
          >
            新建问卷
          </Button>
          <Divider style={{ borderTop: "transparent" }} />
          <Button
            type={pathname.startsWith("/manage/list") ? "default" : "text"}
            size="large"
            icon={<BarsOutlined />}
            onClick={() => handleNav("list")}
          >
            我的问卷
          </Button>
          <Button
            type={pathname.startsWith("/manage/star") ? "default" : "text"}
            size="large"
            icon={<StarOutlined />}
            onClick={() => handleNav("star")}
          >
            星标问卷
          </Button>
          <Button
            type={pathname.startsWith("/manage/trans") ? "default" : "text"}
            size="large"
            icon={<DeleteOutlined />}
            onClick={() => handleNav("trans")}
          >
            回收站
          </Button>
        </Space>
      </div>
      <div className={styles.right}>
        <Outlet />
      </div>
    </div>
  );
};

export default ManageLayout;
