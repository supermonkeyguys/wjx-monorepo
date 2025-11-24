import { FormOutlined } from "@ant-design/icons";
import { Space, Typography } from "antd";
import { useEffect, useState, type FC } from "react";
import styles from "./Logo.module.scss";
import { Link } from "react-router-dom";
import { HOME_PATHNAME, LIST_PATHNAME } from "../router";
import useGetUserInfo from "../Hooks/useGetUserInfo";

const { Title } = Typography;

const Logo: FC = () => {
  const { username } = useGetUserInfo();
  const [pathname, setPathname] = useState(HOME_PATHNAME);

  useEffect(() => {
    if (username) {
      setPathname(LIST_PATHNAME);
    }
  }, [username]);

  return (
    <div className={styles.logo}>
      <Link to={pathname}>
        <Space>
          <Title>
            <FormOutlined />
          </Title>
          <Title>Cookie Query</Title>
        </Space>
      </Link>
    </div>
  );
};

export default Logo;
