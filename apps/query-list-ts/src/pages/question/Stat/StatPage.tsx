/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, type FC } from "react";
import type { PropsType } from "./utils";
import { useParams } from "react-router-dom";
import { useRequest } from "ahooks";
import { getQuestionStatListService } from "../../../services/stat";
import Title from "antd/es/typography/Title";
import { Pagination, Spin, Table } from "antd";
import useGetComponentInfo from "../../../Hooks/useGetComponentInfo";
import { STAT_PAGE_SIZE } from "../../../constant";

const StatPage: FC<PropsType> = (props: PropsType) => {
  const { selectedComponentId } = props;
  const { componentList } = useGetComponentInfo();
  const { id = "" } = useParams();

  const [total, setTotal] = useState(0);
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(STAT_PAGE_SIZE);

  const { loading } = useRequest(
    async () => {
      const res = await getQuestionStatListService(id, {
        page: 1,
        pageSize: 10,
      });
      return res;
    },
    {
      refreshDeps: [id, page, pageSize],
      onSuccess(res) {
        const { total, list = [] } = res;
        setTotal(total);
        setList(list);
        console.log(total);
      },
    },
  );

  const tableColumns = componentList.map((c) => {
    const { fe_id, title, props = {} } = c;
    const colTitle = props.title || title;
    const isSelected = fe_id === selectedComponentId;

    return {
      title: (
        <div style={{ cursor: "pointer", color: isSelected ? "#1890ff" : "" }}>
          {colTitle}
        </div>
      ),
      dataIndex: fe_id,
    };
  });
  const dataSource = list.map((i: any) => ({ ...i, key: i._id }));

  return (
    <div>
      <Title level={3}>答卷数量: {!loading && total}</Title>
      {loading && (
        <div style={{ textAlign: "center" }}>
          <Spin />
        </div>
      )}
      {!loading && (
        <>
          <Table
            dataSource={dataSource}
            columns={tableColumns}
            pagination={false}
          />

          <Pagination
            style={{
              display: "block",
              textAlign: "center",
              marginTop: "24px",
              marginBottom: "16px",
            }}
            total={total}
            pageSize={pageSize}
            current={page}
            onChange={(page) => setPage(page)}
            onShowSizeChange={(page, pageSize) => {
              setPage(page);
              setPageSize(pageSize);
            }}
          />
        </>
      )}
    </div>
  );
};

export default StatPage;
