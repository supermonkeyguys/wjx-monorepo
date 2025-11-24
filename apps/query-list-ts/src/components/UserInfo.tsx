import { type FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LOGIN_PATHNAME } from "../router";
import { UserOutlined } from "@ant-design/icons";
import { Button, message } from "antd";
import { getToken, removeToken } from "../utils/user-token";
import useGetUserInfo from "../Hooks/useGetUserInfo";
import { useDispatch } from "react-redux";
import { logoutReducer } from "../store/userSlice";

const UserInfo: FC = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  // const { data } = useRequest(getUserInfoService)
  const { username, nickname } = useGetUserInfo();
  const token = getToken()

  const logout = () => {
    dispatch(logoutReducer());
    removeToken();
    message.success("成功退出");
    nav("/login");
  };

  const UserInfo = (
    <>
      <span style={{ color: "#e8e8e8" }}>
        <UserOutlined />
        {nickname || username}
      </span>
      <Button type="link" onClick={logout}>
        退出
      </Button>
    </>
  );
  const Login = <Link to={LOGIN_PATHNAME}>登录</Link>;

  return <div>{token ? UserInfo : Login}</div>;
};

export default UserInfo;
