import type { FC } from "react";
import styles from "./EditCanvas.module.scss";
import { Spin } from "antd";
import useGetComponentInfo from "../../../Hooks/useGetComponentInfo";
import {
  changeSelectedId,
  moveComponent,
  type ComponentInfoType,
} from "../../../store/componentReducer";
import { getComponentConfByType } from "../../../components/QuestionComponent";
import { useDispatch } from "react-redux";
import classNames from "classnames";
import useBindCanvasKeyPress from "../../../Hooks/useBindCanvasKeyPress";
import SortableContainer from "../../../components/DragSortable/SortableContainer";
import SortableItem from "../../../components/DragSortable/SortableItem";

type PropsType = {
  loading: boolean;
};

function getComponent(componentInfo: ComponentInfoType) {
  const { type, props } = componentInfo;

  const componentConf = getComponentConfByType(type);
  if (componentConf == null) return null;

  const { Component } = componentConf;
  return <Component {...props} />;
}

const EditCanvas: FC<PropsType> = ({ loading }) => {
  const dispatch = useDispatch();
  const { componentList, selectedId } = useGetComponentInfo();

  const handleClick = (id: string) => {
    dispatch(changeSelectedId(id));
  };

  useBindCanvasKeyPress();

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <Spin />
      </div>
    );
  }

  const componentListWithId = componentList.map((c) => {
    return { ...c, id: c.fe_id };
  });

  const handleDragEnd = (oldIndex: number, newIndex: number) => {
    dispatch(moveComponent({ oldIndex, newIndex }));
  };

  return (
    <SortableContainer items={componentListWithId} onDragEnd={handleDragEnd}>
      <div className={styles.canvas}>
        {componentList
          .filter((c) => !c.isHidden)
          .map((c) => {
            const { fe_id, isLocked } = c;
            const wrapperDefaultClassName = styles["component-wrapper"];
            const selectedClassName = styles.selected;
            const lockedClassName = styles.locked;
            const wrapperClassName = classNames({
              [wrapperDefaultClassName]: true,
              [selectedClassName]: fe_id === selectedId,
              [lockedClassName]: isLocked,
            });

            return (
              <SortableItem id={fe_id} key={fe_id}>
                <div
                  className={wrapperClassName}
                  onClick={() => handleClick(fe_id)}
                >
                  <div className={styles.component}>{getComponent(c)}</div>
                </div>
              </SortableItem>
            );
          })}
      </div>
    </SortableContainer>
  );
};

export default EditCanvas;
