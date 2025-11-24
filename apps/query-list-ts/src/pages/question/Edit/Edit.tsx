import { type FC } from "react";
import styles from "./Edit.module.scss";
import EditCanvas from "./EditCanvas";
import useLoadQuestionData from "../../../Hooks/useLoadQuestionData";
import { useDispatch } from "react-redux";
import { changeSelectedId } from "../../../store/componentReducer";
import LeftPanel from "./LeftPanel";
import RightPanel from "./RightPanel";
import EditHeader from "./EditHeader";

const Edit: FC = () => {
  const dispatch = useDispatch();
  const { loading } = useLoadQuestionData();

  const handleClickOut = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (e.currentTarget === target) dispatch(changeSelectedId(""));
  };

  return (
    <div className={styles.container}>
      <div>
        <EditHeader />
      </div>
      <div className={styles["content-wrapper"]}>
        <div className={styles.content}>
          <div className={styles.left}>
            <LeftPanel />
          </div>
          <div className={styles.main} onClick={handleClickOut}>
            <div className={styles["canvas-wrapper"]}>
              <EditCanvas loading={loading} />
            </div>
          </div>
          <div className={styles.right}>
            <RightPanel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;
