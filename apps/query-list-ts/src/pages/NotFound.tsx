import { Button, Result } from "antd";
import type { FC } from "react";
import { useNavigate } from "react-router-dom";
import { LIST_PATHNAME } from "../router";

const NotFound: FC = () => {
  const nav = useNavigate();
  return (
    <Result
      status="404"
      title="404"
      subTitle="抱歉, 您访问的页面不存在"
      extra={
        <Button type="primary" onClick={() => nav(LIST_PATHNAME)}>
          返回首页
        </Button>
      }
    ></Result>
  );
};

export default NotFound;
