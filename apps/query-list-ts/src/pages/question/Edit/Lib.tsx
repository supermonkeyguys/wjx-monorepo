import { useCallback, type FC } from "react";
import {
  componentConfGroup,
  type ComponentConfType,
} from "../../../components/QuestionComponent";
import { Typography } from "antd";
import styles from "./Lib.module.scss";
import { useDispatch } from "react-redux";
import { addComponent } from "../../../store/componentReducer";
import { nanoid } from "@reduxjs/toolkit";

const { Title } = Typography;

function GetComponent(c: ComponentConfType) {
  const dispatch = useDispatch();
  const { title, type, Component, defaultProps } = c;

  const handleClick = useCallback(() => {
    dispatch(
      addComponent({
        fe_id: nanoid(),
        title,
        type,
        props: defaultProps,
      }),
    );
  }, []);

  return (
    <div key={type} className={styles.wrapper} onClick={handleClick}>
      <div className={styles.component}>
        <Component />
      </div>
    </div>
  );
}

const Lib: FC = () => {
  return (
    <>
      {componentConfGroup.map((group, index) => {
        const { groupName, groupId, components } = group;

        return (
          <div key={groupId}>
            <Title
              level={3}
              style={{ fontSize: "16px", marginTop: index > 0 ? "30px" : "0" }}
            >
              {groupName}
            </Title>
            <div>{components.map((c) => GetComponent(c))}</div>
          </div>
        );
      })}
    </>
  );
};

export default Lib;
