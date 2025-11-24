import type { FC } from "react";
import useGetComponentInfo from "../../../Hooks/useGetComponentInfo";
import {
  getComponentConfByType,
  type ComponentPropsType,
} from "../../../components/QuestionComponent";
import { useDispatch } from "react-redux";
import { changeComponentProps } from "../../../store/componentReducer";

const NoProp: FC = () => {
  return <span>未选中</span>;
};

const ComponentProp: FC = () => {
  const dispatch = useDispatch();
  const { selectedComponent } = useGetComponentInfo();
  if (selectedComponent == null) return <NoProp />;

  const { type, props, isLocked } = selectedComponent;
  const componentConf = getComponentConfByType(type);
  if (componentConf == null) return <NoProp />;

  function changeProps(newProps: ComponentPropsType) {
    if (selectedComponent == null) return;
    const { fe_id } = selectedComponent;
    dispatch(changeComponentProps({ fe_id, newProps }));
  }

  const { PropComponent } = componentConf;

  return (
    <div>
      <PropComponent {...props} onChange={changeProps} disable={isLocked} />
    </div>
  );
};

export default ComponentProp;
