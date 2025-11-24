import { useState, type FC } from "react";
import useLoadQuestionData from "../../../Hooks/useLoadQuestionData";
import { Button, Result, Spin } from "antd";
import useGetPageInfo from "../../../Hooks/useGetPageInfo";
import { useNavigate } from "react-router-dom";
import { useTitle } from "ahooks";
import styles from "./Stat.module.scss";
import StatHeader from "./StatHeader";
import ComponentList from "./ComponentList";
import StatPage from "./StatPage";
import ChartStat from "./ChartStat";

const Stat: FC = () => {
  const nav = useNavigate();
  const [selectedComponentId, setSelectedComponentId] = useState("");
  const [selectedComponentType, setSelectedComponentType] = useState("");
  const { title, isPublished = true } = useGetPageInfo();
  const { loading } = useLoadQuestionData();
  useTitle(`问卷统计-${title}`);

  const getElem = (
    <div style={{ textAlign: "center", marginTop: "60px" }}>
      <Spin />
    </div>
  );

  const getContentElem = () => {
    if (typeof isPublished === "boolean" && !isPublished) {
      return (
        <div style={{ flex: "1" }}>
          <Result
            status="warning"
            title="该页面尚未发布"
            extra={
              <Button type="primary" onClick={() => nav(-1)}>
                返回
              </Button>
            }
          ></Result>
        </div>
      );
    }

    return (
      <>
        <div className={styles.left}>
          <ComponentList
            selectedComponentId={selectedComponentId}
            setSelectedComponentId={setSelectedComponentId}
            setSelectedComponentType={setSelectedComponentType}
          />
        </div>
        <div className={styles.main}>
          <StatPage
            selectedComponentId={selectedComponentId}
            setSelectedComponentId={setSelectedComponentId}
            setSelectedComponentType={setSelectedComponentType}
          />
        </div>
        <div className={styles.right}>
          <ChartStat
            selectedComponentId={selectedComponentId}
            selectedComponentType={selectedComponentType}
          />
        </div>
      </>
    );
  };

  return (
    <div className={styles.container}>
      <StatHeader />
      <div className={styles["content-wrapper"]}>
        {loading && getElem}
        {!loading && <div className={styles.content}>{getContentElem()}</div>}
      </div>
      <div>Bottom</div>
    </div>
  );
};

export default Stat;
