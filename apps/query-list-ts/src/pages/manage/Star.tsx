/* eslint-disable @typescript-eslint/no-explicit-any */
import { type FC } from "react";
import styles from "./common.module.scss";
import QuestionCard from "../../components/QuestionCard";
import useTitle from "../../Hooks/useTitle";
import { Empty, Spin, Typography } from "antd";
import ListSearch from "../../components/ListSearch";
import useLoadQuestionListData from "../../Hooks/useLoadQuestionListData";
import ListPage from "../../components/ListPage";

const { Title } = Typography;

const Star: FC = () => {
  useTitle("Cookie问卷-Star问卷");
  const { data = {}, loading } = useLoadQuestionListData({ isStar: true });
  const { list = [], total = 0 } = data;

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3} style={{ margin: 0 }}>
            星标问卷
          </Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {loading && (
          <div style={{ textAlign: "center" }}>
            <Spin />
          </div>
        )}
        {!loading && list.length > 0
          ? list.map((q: any) => {
              const { _id, isStar } = q;
              if (!isStar) return null;
              return <QuestionCard key={_id} {...q} />;
            })
          : !loading && <Empty description="暂无数据" />}
      </div>
      <div className={styles.footer}>
        <ListPage total={total} />
      </div>
    </>
  );
};

export default Star;
