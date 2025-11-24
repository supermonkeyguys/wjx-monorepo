import { useState, type ChangeEvent, type FC } from "react";
import useGetComponentInfo from "../../../Hooks/useGetComponentInfo";
import styles from "./Layers.module.scss";
import classNames from "classnames";
import { Button, Input, message, Space } from "antd";
import { useDispatch } from "react-redux";
import {
  changeComponentTitle,
  changeHiddenComponent,
  changeSelectedId,
  moveComponent,
  toggleComponentLock,
} from "../../../store/componentReducer";
import { EyeInvisibleOutlined, LockOutlined } from "@ant-design/icons";
import SortableContainer from "../../../components/DragSortable/SortableContainer";
import SortableItem from "../../../components/DragSortable/SortableItem";

const Layers: FC = () => {
  const dispatch = useDispatch();
  const [changingTitleId, setChangingTitleId] = useState("");
  const { componentList, selectedId } = useGetComponentInfo();

  const handleTitleClick = (fe_id: string) => {
    console.log(fe_id);
    const selectedComponent = componentList.find((c) => c.fe_id === fe_id);
    if (selectedComponent && selectedComponent.isHidden) {
      message.info("不能选中隐藏的组件");
      return;
    }
    if (fe_id !== selectedId) {
      // 当前组件未被选中, 执行选中
      dispatch(changeSelectedId(fe_id));
      setChangingTitleId("");
      return;
    }

    // 点击修改标题
    setChangingTitleId(fe_id);
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value.trim();
    if (!newTitle) return;
    if (!selectedId) return;

    dispatch(changeComponentTitle({ fe_id: selectedId, title: newTitle }));
  };

  const changeHidden = (fe_id: string, isHidden: boolean) => {
    dispatch(changeHiddenComponent({ fe_id, isHidden }));
  };

  const changeLocked = (fe_id: string) => {
    dispatch(toggleComponentLock({ fe_id }));
  };

  const componentListWithId = componentList.map((c) => {
    return { ...c, id: c.fe_id };
  });

  const handleDragEnd = (oldIndex: number, newIndex: number) => {
    dispatch(moveComponent({ oldIndex, newIndex }));
  };

  return (
    <SortableContainer items={componentListWithId} onDragEnd={handleDragEnd}>
      {componentList.map((c) => {
        const { fe_id, title, isHidden, isLocked } = c;

        const titleDefaultClassName = styles.title;
        const selectedClassName = styles.selected;
        const titleClassName = classNames({
          [titleDefaultClassName]: true,
          [selectedClassName]: fe_id === selectedId,
        });

        return (
          <SortableItem key={fe_id} id={fe_id}>
            <div className={styles.wrapper}>
              <div
                className={titleClassName}
                onClick={() => handleTitleClick(fe_id)}
              >
                {fe_id === changingTitleId && (
                  <Input
                    onChange={handleTitleChange}
                    value={title}
                    onBlur={() => {
                      console.log("输入框失焦");
                      setChangingTitleId("");
                    }}
                    onPressEnter={() => setChangingTitleId("")}
                  />
                )}
                {fe_id !== changingTitleId && title}
              </div>
              <div className={styles.handler}>
                <Space direction="horizontal">
                  <Button
                    size="small"
                    className={!isHidden ? styles.btn : ""}
                    shape="circle"
                    icon={<EyeInvisibleOutlined />}
                    type={isHidden ? "primary" : "text"}
                    onClick={() => changeHidden(fe_id, !isHidden)}
                  />
                  <Button
                    size="small"
                    className={!isLocked ? styles.btn : ""}
                    shape="circle"
                    icon={<LockOutlined />}
                    type={isLocked ? "primary" : "text"}
                    onClick={() => changeLocked(fe_id)}
                  />
                </Space>
              </div>
            </div>
          </SortableItem>
        );
      })}
    </SortableContainer>
  );
};

export default Layers;
