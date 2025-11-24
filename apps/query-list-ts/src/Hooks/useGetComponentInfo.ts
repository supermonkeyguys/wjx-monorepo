import { useSelector } from "react-redux";
import { type StateType } from "../store";
import type { ComponentStateType } from "../store/componentReducer";

const useGetComponentInfo = () => {
  const components = useSelector<StateType>(
    (state) => state.components.present,
  ) as ComponentStateType;

  const { componentList = [], selectedId, copiedComponent } = components;

  const selectedComponent = componentList.find((c) => c.fe_id === selectedId);
  const { isLocked } = selectedComponent || {};

  return {
    componentList,
    selectedId,
    selectedComponent,
    isLocked,
    copiedComponent,
  };
};

export default useGetComponentInfo;
