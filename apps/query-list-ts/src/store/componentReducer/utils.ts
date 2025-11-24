import type { ComponentInfoType, ComponentStateType } from ".";
import cloneDeep from "lodash.clonedeep";

export function getNextSelectedId(
  fe_id: string,
  componentList: ComponentInfoType[],
) {
  const visibleComponentList = componentList.filter((c) => !c.isHidden);
  const index = visibleComponentList.findIndex((c) => c.fe_id === fe_id);
  if (index < 0) return "";

  let newSelectedId = "";
  const length = visibleComponentList.length;
  if (length <= 1) {
    newSelectedId = "";
  } else {
    if (index + 1 === length) {
      newSelectedId = visibleComponentList[index - 1].fe_id;
    } else {
      newSelectedId = visibleComponentList[index + 1].fe_id;
    }
  }

  return newSelectedId;
}

export function insertNewComponent(
  draft: ComponentStateType,
  newComponent: ComponentInfoType,
) {
  const { selectedId, componentList } = draft;
  const index = componentList.findIndex((c) => c.fe_id === selectedId);

  if (index < 0) draft.componentList.push(newComponent);
  else {
    draft.componentList.splice(index + 1, 0, newComponent);
  }

  draft.selectedId = newComponent.fe_id;
}

export function getCopiedComponent(draft: ComponentStateType) {
  const { selectedId, componentList = [] } = draft;
  const selectedComponent = componentList.find((c) => c.fe_id === selectedId);
  if (selectedComponent == null) return;
  draft.copiedComponent = cloneDeep(selectedComponent);
}

export function removeSelectedComponent(draft: ComponentStateType) {
  const { selectedId, componentList } = draft;
  draft.selectedId = getNextSelectedId(selectedId, componentList);
  const index = componentList.findIndex((c) => c.fe_id === selectedId);
  if (index < 0) return;
  draft.componentList.splice(index, 1);
}
