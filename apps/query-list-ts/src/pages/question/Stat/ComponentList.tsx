import { type FC } from "react";
import styles from "./ComponentList.module.scss";
import useGetComponentInfo from "../../../Hooks/useGetComponentInfo";
import classNames from "classnames";
import { getComponentConfByType } from "../../../components/QuestionComponent";
import type { PropsType } from "./utils";

const ComponentList: FC<PropsType> = (props: PropsType) => {
  const {
    selectedComponentId,
    setSelectedComponentId,
    setSelectedComponentType,
  } = props;
  const { componentList } = useGetComponentInfo();

  return (
    <div className={styles.container}>
      {componentList
        .filter((c) => !c.isHidden)
        .map((c) => {
          const { fe_id, props, type } = c;

          const componentConf = getComponentConfByType(type);
          if (componentConf == null) return null;

          const { Component } = componentConf;

          const wrapperDefaultClassName = styles["component-wrapper"];
          const selectedClassName = styles.selected;
          const wrapperClassName = classNames({
            [wrapperDefaultClassName]: true,
            [selectedClassName]: fe_id === selectedComponentId,
          });

          return (
            <div
              className={wrapperClassName}
              key={fe_id}
              onClick={() => {
                setSelectedComponentId(fe_id);
                setSelectedComponentType(type);
              }}
            >
              <div className={styles.component}>
                <Component {...props} />
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default ComponentList;
