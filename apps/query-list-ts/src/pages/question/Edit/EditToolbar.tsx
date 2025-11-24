import {
  BlockOutlined,
  CopyOutlined,
  DeleteOutlined,
  DownOutlined,
  EyeInvisibleOutlined,
  LockOutlined,
  RedoOutlined,
  UndoOutlined,
  UpOutlined,
} from "@ant-design/icons";
import { Button, Space, Tooltip } from "antd";
import type { FC } from "react";
import { useDispatch } from "react-redux";
import {
  changeHiddenComponent,
  copyComponent,
  deleteComponent,
  moveComponent,
  pasteComponent,
  toggleComponentLock,
} from "../../../store/componentReducer";
import useGetComponentInfo from "../../../Hooks/useGetComponentInfo";
import { ActionCreators as UndoActionCreators } from "redux-undo";

const EditToolbar: FC = () => {
  const dispatch = useDispatch();
  const {
    selectedId,
    selectedComponent,
    copiedComponent = null,
    componentList,
  } = useGetComponentInfo();
  const { isLocked } = selectedComponent || {};
  const selectedIndex = componentList.findIndex((c) => c.fe_id === selectedId);
  const isFirst = selectedIndex === 0;
  const isLast = selectedIndex === componentList.length - 1;

  const handleDeleteComponent = () => {
    dispatch(deleteComponent());
  };

  const handleHiddenComponent = () => {
    dispatch(changeHiddenComponent({ fe_id: selectedId, isHidden: true }));
  };

  const handleLockComponent = () => {
    dispatch(toggleComponentLock({ fe_id: selectedId }));
  };

  const handleCopyComponent = () => {
    dispatch(copyComponent());
  };

  const handlePasteComponent = () => {
    dispatch(pasteComponent());
  };

  const handleMoveUp = () => {
    if (isFirst) return;
    dispatch(
      moveComponent({ oldIndex: selectedIndex, newIndex: selectedIndex - 1 }),
    );
  };

  const handleMoveDown = () => {
    if (isLast) return;
    dispatch(
      moveComponent({ oldIndex: selectedIndex, newIndex: selectedIndex + 1 }),
    );
  };

  const handleUndo = () => {
    dispatch(UndoActionCreators.undo());
  };

  const handleRedo = () => {
    dispatch(UndoActionCreators.redo());
  };

  return (
    <Space>
      <Tooltip title="删除">
        <Button
          shape="circle"
          icon={<DeleteOutlined />}
          onClick={handleDeleteComponent}
        />
      </Tooltip>
      <Tooltip title="隐藏">
        <Button
          shape="circle"
          icon={<EyeInvisibleOutlined />}
          onClick={handleHiddenComponent}
        />
      </Tooltip>
      <Tooltip title="锁定">
        <Button
          shape="circle"
          icon={<LockOutlined />}
          onClick={handleLockComponent}
          type={isLocked ? "primary" : "default"}
        />
      </Tooltip>
      <Tooltip title="复制">
        <Button
          shape="circle"
          icon={<CopyOutlined />}
          onClick={handleCopyComponent}
        />
      </Tooltip>
      <Tooltip title="粘贴">
        <Button
          shape="circle"
          icon={<BlockOutlined />}
          onClick={handlePasteComponent}
          disabled={copiedComponent == null}
        />
      </Tooltip>
      <Tooltip title="上移">
        <Button
          shape="circle"
          icon={<UpOutlined />}
          onClick={handleMoveUp}
          disabled={isFirst}
        />
      </Tooltip>
      <Tooltip title="下移">
        <Button
          shape="circle"
          icon={<DownOutlined />}
          onClick={handleMoveDown}
          disabled={isLast}
        />
      </Tooltip>
      <Tooltip title="撤销">
        <Button shape="circle" icon={<UndoOutlined />} onClick={handleUndo} />
      </Tooltip>
      <Tooltip title="重做">
        <Button shape="circle" icon={<RedoOutlined />} onClick={handleRedo} />
      </Tooltip>
    </Space>
  );
};

export default EditToolbar;
