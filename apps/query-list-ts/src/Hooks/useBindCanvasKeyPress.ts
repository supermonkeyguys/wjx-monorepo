import { useKeyPress } from "ahooks";
import { useDispatch } from "react-redux";
import {
  copyComponent,
  cutComponent,
  deleteComponent,
  pasteComponent,
  selectedNextComponent,
  selectedPrevComponent,
} from "../store/componentReducer";
import { ActionCreators } from "redux-undo";

// 检查当前 focus 元素是否是 合法的 (非 input 框内)
function isActiveElementValid() {
  const activeElem = document.activeElement;

  // 增添 dnd 之前
  // if (activeElem === document.body) return true

  // 增添之后
  // dnd 会有外层元素包裹住
  if (activeElem === document.body) return true;
  if (activeElem?.matches('div[role="button"]')) return true;

  return false;
}

function useBindCanvasKeyPress() {
  const dispatch = useDispatch();

  useKeyPress(["backspace", "delete"], () => {
    if (isActiveElementValid()) dispatch(deleteComponent());
  });

  useKeyPress(["ctrl.c"], () => {
    if (isActiveElementValid()) dispatch(copyComponent());
  });

  useKeyPress(["ctrl.v"], () => {
    if (isActiveElementValid()) dispatch(pasteComponent());
  });

  useKeyPress(["uparrow"], () => {
    if (isActiveElementValid()) dispatch(selectedPrevComponent());
  });

  useKeyPress(["downarrow"], () => {
    if (isActiveElementValid()) dispatch(selectedNextComponent());
  });

  useKeyPress(["ctrl.x"], () => {
    if (isActiveElementValid()) dispatch(cutComponent());
  });
  useKeyPress(
    ["ctrl.z"],
    () => {
      dispatch(ActionCreators.undo());
    },
    { exactMatch: true },
  );
  useKeyPress(["ctrl.shift.z"], () => {
    dispatch(ActionCreators.redo());
  });
}

export default useBindCanvasKeyPress;
