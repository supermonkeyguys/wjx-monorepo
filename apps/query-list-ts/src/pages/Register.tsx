import { UserAddOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Space, Typography } from "antd";
import type { FC } from "react";
import styles from "./Register.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { LOGIN_PATHNAME } from "../router";
import { useRequest } from "ahooks";
import { loginUserService, registerUserService } from "../services/user";

const { Title } = Typography;

const Register: FC = () => {
  const nav = useNavigate();

  const { run: finishRegister } = useRequest(
    async ({ username, password, nickname }) =>
      await registerUserService({ username, password, nickname }),
    {
      manual: true,
      onSuccess() {
        message.success("注册成功");
        nav("/login");
      },
    },
  );

  const onFinish = (value: any) => {
    finishRegister(value);
  };

  return (
    <div className={styles.container}>
      <div>
        <Space>
          <Title level={2}>
            <UserAddOutlined />
          </Title>
          <Title level={2}>注册新用户</Title>
        </Space>
      </div>
      <div>
        <Form labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
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
            <Input></Input>
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: "请输入密码" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="确认密码"
            name="confirm"
            dependencies={["password"]}
            rules={[
              { required: true, message: "请输入密码" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  } else {
                    return Promise.reject(new Error("两次密码不一致"));
                  }
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item label="昵称" name="nickname">
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Space>
              <Button type="primary" htmlType="submit" onClick={onFinish}>
                注册
              </Button>
              <Link to={LOGIN_PATHNAME}>已有帐户请登录</Link>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Register;
