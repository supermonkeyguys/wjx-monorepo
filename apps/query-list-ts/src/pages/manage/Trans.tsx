/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, type FC } from "react";
import styles from "./common.module.scss";
import useTitle from "../../Hooks/useTitle";
import {
  Button,
  Empty,
  message,
  Modal,
  Space,
  Spin,
  Table,
  Tag,
  Typography,
} from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import ListSearch from "../../components/ListSearch";
import useLoadQuestionListData from "../../Hooks/useLoadQuestionListData";
import ListPage from "../../components/ListPage";
import { useRequest } from "ahooks";
import {
  deleteQuestionService,
  updateQuestionService,
} from "../../services/question";

const { Title } = Typography;
const { confirm } = Modal;

const Trans: FC = () => {
  useTitle("Cookie问卷-回收站");

  const tableColumns = [
    {
      title: "标题",
      dataIndex: "title",
    },
    {
      title: "是否发布",
      dataIndex: "isPublished",
      render: (isPublished: boolean) => {
        return isPublished ? (
          <Tag color="processing">已发布</Tag>
        ) : (
          <Tag>未发布</Tag>
        );
      },
    },
    {
      title: "答卷",
      dataIndex: "answerCount",
    },
    {
      title: "创建时间",
      dataIndex: "createdAt",
    },
  ];

  const {
    data = {},
    loading,
    refresh,
  } = useLoadQuestionListData({ isDeleted: true });
  const { list = [], total = 0 } = data;

  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const handleRefreshPage = (msg: string) => {
    message.success(msg);
    refresh();
    setSelectedIds([]); // 在删除后重置选中删除列表
  };

  const { run: recover } = useRequest(
    async () => {
      for await (const id of selectedIds!) {
        await updateQuestionService(id, { isDeleted: false });
      }
    },
    {
      manual: true,
      debounceWait: 500,
      onSuccess() {
        handleRefreshPage("恢复成功");
      },
    },
  );
  const { run: deleteQuestion } = useRequest(
    async () => await deleteQuestionService(selectedIds!),
    {
      manual: true,
      onSuccess() {
        handleRefreshPage("删除成功");
      },
    },
  );

  const handleDel = () => {
    confirm({
      title: "确认是否彻底删除问卷?",
      icon: <ExclamationCircleOutlined />,
      content: "删除后不可找回!!!",
      onOk: deleteQuestion,
    });
  };

  const TableElem = (
    <>
      <div style={{ gap: "12px" }}>
        <Space style={{ margin: "12px" }}>
          <Button
            type="primary"
            disabled={selectedIds?.length === 0}
            onClick={recover}
          >
            恢复
          </Button>
          <Button
            danger
            disabled={selectedIds?.length === 0}
            onClick={handleDel}
          >
            彻底删除
          </Button>
        </Space>
        <Table
          dataSource={list}
          columns={tableColumns}
          pagination={false}
          rowKey={(q: any) => q._id}
          rowSelection={{
            type: "checkbox",
            onChange: (selectedRowKey) => {
              setSelectedIds(selectedRowKey as string[]);
              console.log("selectedRowKey: ", selectedRowKey);
            },
          }}
        />
      </div>
    </>
  );

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3} style={{ margin: "0" }}>
            回收站
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
          ? TableElem
          : !loading && <Empty description="暂无数据" />}
      </div>
      <div className={styles.footer}>
        {!loading && <ListPage total={total} />}
      </div>
    </>
  );
};

export default Trans;
