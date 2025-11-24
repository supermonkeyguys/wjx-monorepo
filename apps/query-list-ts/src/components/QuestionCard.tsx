import {
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  LineChartOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { Button, Divider, message, Modal, Popconfirm, Space, Tag } from "antd";
import { useState, type FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import "@ant-design/v5-patch-for-react-19";
import styles from "./QuestionCard.module.scss";
import { useRequest } from "ahooks";
import {
  duplicateQuestionService,
  updateQuestionService,
} from "../services/question";

const { confirm } = Modal;

interface PropsType {
  _id: string;
  title: string;
  isPublished: boolean;
  isStar: boolean;
  isDeleted: boolean;
  answerCount: number;
  createdAt: string;
  handlePublish?: (id: string) => void;
  handleDel?: (id: string) => void
}

const QuestionCard: FC<PropsType> = (props: PropsType) => {
  const {
    _id,
    title,
    isPublished,
    isStar,
    answerCount,
    createdAt,
    handleDel
  } = props;

  const nav = useNavigate();
  const [isStarState, setIsStarState] = useState(isStar);

  // 标星
  const { loading: changeStarLoading, run: handleStar } = useRequest(
    async () => {
      await updateQuestionService(_id, { isStar: !isStarState });
    },
    {
      manual: true,
      onSuccess() {
        setIsStarState(!isStarState);
        message.success("已更新");
      },
    },
  );

  // 复制问卷
  const { loading: duplicateLoading, run: handleDuplicate } = useRequest(
    async () => await duplicateQuestionService(_id),
    {
      manual: true,
      onSuccess(result) {
        nav(`/question/edit/${result.id || result._id}`);
      },
    },
  );


  function copyQuery() {
    message.success("复制成功");
    handleDuplicate();
  }

  const handleDelete = (id:string) => {
    confirm({
      title: "确定删除问卷",
      icon: <ExclamationCircleOutlined />,
      onOk: () => {
        handleDel!(id)
      },
    });
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.title}>
          <div className={styles.left}>
            <Link
              to={isPublished ? `/question/stat/${_id}` : `/question/edit/${_id}`}
            >
              <Space>
                {isStarState && <StarOutlined style={{ color: "red" }} />}
                {title}
              </Space>
            </Link>
          </div>
          <div className={styles.right}>
            <Space>
              {isPublished ? (
                <Tag color="processing">已发布</Tag>
              ) : (
                <Tag>未发布</Tag>
              )}
              <span>答卷：{answerCount}</span>
              <span>{createdAt}</span>
            </Space>
          </div>
        </div>
        <Divider style={{ margin: "12px" }} />
        <div className={styles["button-container"]}>
          <div className={styles.left}>
            <Space>
              <Button
                icon={<EditOutlined />}
                type="text"
                size="small"
                onClick={() => nav(`/question/edit/${_id}`)}
              >
                编辑问卷
              </Button>
              <Button
                icon={<LineChartOutlined />}
                type="text"
                size="small"
                onClick={() => nav(`/question/stat/${_id}`)}
                disabled={!isPublished}
              >
                问卷统计
              </Button>
            </Space>
          </div>
          <div className={styles.right}>
            <Space>
              <Button
                type="text"
                icon={<StarOutlined />}
                size="small"
                onClick={handleStar}
                disabled={changeStarLoading}
              >
                {isStarState ? "取消标星" : "标星"}
              </Button>
              <Popconfirm
                title="是否复制该问卷"
                okText="确定"
                cancelText="取消"
                onConfirm={copyQuery}
              >
                <Button
                  icon={<CopyOutlined />}
                  type="text"
                  size="small"
                  disabled={duplicateLoading}
                >
                  复制
                </Button>
              </Popconfirm>
              <Button
                icon={<DeleteOutlined />}
                type="text"
                size="small"
                onClick={() => handleDelete(_id)}
              >
                删除
              </Button>
            </Space>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuestionCard;
