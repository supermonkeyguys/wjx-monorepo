import { useEffect, useState, type FC } from "react";
import type { PropsType } from "./utils";
import Title from "antd/es/typography/Title";
import { useParams } from "react-router-dom";
import { useRequest } from "ahooks";
import { getComponentStatService } from "../../../services/stat";
import { getComponentConfByType } from "../../../components/QuestionComponent";

const ChartStat: FC<PropsType> = (props: PropsType) => {
  const { id = "" } = useParams();
  const [statData, setStatData] = useState([]);
  const { selectedComponentId, selectedComponentType = "" } = props;

  const { run } = useRequest(
    async (questionId, componentId) =>
      await getComponentStatService(questionId, componentId),
    {
      manual: true,
      onSuccess(res) {
        console.log(res)
        setStatData(res.stat);
      },
    },
  );

  useEffect(() => {
    if (selectedComponentId) run(id, selectedComponentId);
  }, [id, selectedComponentId]);

  const getStatElem = () => {
    if (!selectedComponentId)
      return <div style={{ textAlign: "center" }}>未选中组件</div>;
    const { StatComponent } =
      getComponentConfByType(selectedComponentType) || {};
    if (StatComponent == null) return <div>该组件无统计列表</div>;

    if(statData.length)return <StatComponent stat={statData} />;

    return <div>暂无数据</div>
  };

  return (
    <>
      <Title level={3}>图标统计</Title>
      {getStatElem()}
    </>
  );
};

export default ChartStat;
