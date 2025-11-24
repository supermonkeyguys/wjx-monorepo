import { Layout, Spin } from "antd";
import type { FC } from "react";
import { Outlet } from "react-router-dom";
import styles from "./MainLayouts.module.scss";
import Logo from "../components/Logo";
import UserInfo from "../components/UserInfo";
import useLoadUserData from "../Hooks/useLoadUserData";

const { Header, Content, Footer } = Layout;

const MainLayout: FC = () => {
  const { waitingUserData } = useLoadUserData();

  return (
    <Layout>
      <Header className={styles.header}>
        <div className={styles.left}>
          <Logo />
        </div>
        <div className={styles.right}>
          <UserInfo />
        </div>
      </Header>
      <Content className={styles.main}>
        {waitingUserData ? <Spin /> : <Outlet />}
      </Content>
      <Footer className={styles.footer}>Cookie Query Editor</Footer>
    </Layout>
  );
};

export default MainLayout;
