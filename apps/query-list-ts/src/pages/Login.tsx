import { UserAddOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Form,
  Input,
  message,
  Space,
  Typography,
} from "antd";
import { useEffect, type FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LIST_PATHNAME, REGISTER_PATHNAME } from "../router";
import styles from "./Login.module.scss";
import { loginUserService } from "../services/user";
import { useRequest } from "ahooks";
import { setToken } from "../utils/user-token";
import { useDispatch } from "react-redux";
import { loginReducer } from "../store/userSlice";

const { Title } = Typography;
const USERNAME_KEY = "USERNAME";
const PASSWORD_KEY = "PASSWORD";

function getUserInfoFromStorage() {
  return {
    username: localStorage.getItem(USERNAME_KEY),
    password: localStorage.getItem(PASSWORD_KEY),
  };
}

const Login: FC = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch()
  const nav = useNavigate();

  useEffect(() => {
    const { username, password } = getUserInfoFromStorage();
    form.setFieldsValue({ username, password });
  }, []);

  const { run: finishLogin } = useRequest(
    async (username, password) =>
      await loginUserService({ username, password }),
    {
      manual: true,
      onSuccess(result) {
        const { token = "", nickname, username } = result;
        setToken(token);
        dispatch(loginReducer({ username, nickname }))
        message.success("登录成功");
        nav(LIST_PATHNAME);
      },
    },
  );

  const onFinish = (value: any) => {
    const { username, password } = value || {};
    finishLogin(username, password);
  };

  return (
    <div className={styles.container}>
      <div>
        <Space>
          <Title level={2}>
            <UserAddOutlined />
          </Title>
          <Title level={2}>用户登录</Title>
        </Space>
      </div>
      <div>
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          form={form}
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[
              { required: true, message: "请输入用户名" },
              {
                type: "string",
                min: 5,
                max: 20,
                message: "字符长度在 5~20 之间",
              },
              { pattern: /^\w+$/, message: "只能是字母数字和下划线" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: "请输入密码" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="remember"
            wrapperCol={{ offset: 6, span: 16 }}
            valuePropName="checked"
          >
            <Checkbox>记住我</Checkbox>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Space>
              <Button type="primary" htmlType="submit" onClick={onFinish}>
                登录
              </Button>
              <Link to={REGISTER_PATHNAME}>注册新用户</Link>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
