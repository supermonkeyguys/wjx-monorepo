import { useState, type ChangeEvent, type FC } from "react";
import styles from "./EditHeader.module.scss";
import { Button, Input, message, Space, Typography } from "antd";
import { EditOutlined, LeftOutlined, LoadingOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { LIST_PATHNAME } from "../../../router";
import EditToolbar from "./EditToolbar";
import useGetPageInfo from "../../../Hooks/useGetPageInfo";
import { useDispatch } from "react-redux";
import { changePageInfoTitle } from "../../../store/pageInfoReducer";
import useGetComponentInfo from "../../../Hooks/useGetComponentInfo";
import { useDebounceEffect, useKeyPress, useRequest } from "ahooks";
import { updateQuestionService } from "../../../services/question";

const { Title } = Typography;

const TitleElem: FC = () => {
  const dispatch = useDispatch();
  const { title } = useGetPageInfo();
  const [activeChangeTitle, setActiveChangeTitle] = useState(false);
  const [tempTitle, setTempTitle] = useState(title)

  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    // const newTitle = e.target.value.trim();
    // if (!newTitle) {
    //   return;
    // }
    // dispatch(changePageInfoTitle(newTitle));

    setTempTitle(e.target.value)
  };

  const handleConfirm = () => {
    const newTitle = tempTitle.trim()
    if (!newTitle) {
      message.warning("标题不能为空")
      setTempTitle(title)
    } else if (newTitle !== title) {
      dispatch(changePageInfoTitle(newTitle))
    }
    setActiveChangeTitle(false)
  }

  const handleCancel = () => {
    setTempTitle(title)
    setActiveChangeTitle(false)
  }

  if (activeChangeTitle) {
    return (
      <Input
        value={tempTitle}
        onChange={handleChangeTitle}
        onPressEnter={handleConfirm}
        onBlur={handleConfirm}
        autoFocus
      ></Input>
    );
  }

  return (
    <Space>
      <Title level={5} style={{ margin: 0 }}>
        {title}
      </Title>
      <Button
        type="text"
        icon={<EditOutlined />}
        onClick={() => setActiveChangeTitle(true)}
      />
    </Space>
  );
};

const SaveButton: FC = () => {
  const { id } = useParams();
  const { componentList = [] } = useGetComponentInfo();
  const pageInfo = useGetPageInfo();

  const { loading, run: save } = useRequest(
    async () => {
      if (!id) return;
      await updateQuestionService(id, { ...pageInfo, componentList });
    },
    {
      manual: true,
    },
  );
  const manualSave = () => {
    save()
    message.success('保存成功')
  }

  useKeyPress(["ctrl.s"], (event: KeyboardEvent) => {
    event.preventDefault();
    if (!loading) save();
  });

  useDebounceEffect(
    () => {
      save();
    },
    [componentList, pageInfo],
    { wait: 1000 },
  );

  return (
    <Button
      onClick={manualSave}
      icon={loading ? <LoadingOutlined /> : null}
      disabled={loading}
    >
      保存
    </Button>
  );
};

const PublishButton: FC = () => {
  const nav = useNavigate();
  const { id } = useParams();
  const { componentList = [] } = useGetComponentInfo();
  const pageInfo = useGetPageInfo();

  const { loading, run: publish } = useRequest(
    async () => {
      if (!id) return;
      await updateQuestionService(id, {
        ...pageInfo,
        componentList,
        isPublished: true,
      });
    },
    {
      manual: true,
      onSuccess() {
        message.success("发布成功");
        nav("/question/stat/" + id);
      },
    },
  );

  return (
    <Button disabled={loading} type="primary" onClick={publish}>
      发布
    </Button>
  );
};

const EditHeader: FC = () => {
  const nav = useNavigate();

  return (
    <div className={styles["header-wrapper"]}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Space>
            <Button
              type="link"
              icon={<LeftOutlined />}
              onClick={() => {
                nav(LIST_PATHNAME);
              }}
            >
              返回
            </Button>
            <TitleElem />
          </Space>
        </div>
        <div className={styles.main}>
          <EditToolbar />
        </div>
        <div className={styles.right}>
          <Space>
            <SaveButton />
            <PublishButton />
          </Space>
        </div>
      </div>
    </div>
  );
};

export default EditHeader;
