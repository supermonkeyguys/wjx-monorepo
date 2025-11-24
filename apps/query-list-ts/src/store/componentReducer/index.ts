import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";
import type { ComponentPropsType } from "../../components/QuestionComponent";
import { produce } from "immer";
import {
  getCopiedComponent,
  getNextSelectedId,
  insertNewComponent,
  removeSelectedComponent,
} from "./utils";
import { arrayMove } from "@dnd-kit/sortable";

export type ComponentInfoType = {
  fe_id: string;
  type: string;
  title: string;
  isHidden?: boolean;
  isLocked?: boolean;
  props: ComponentPropsType;
};

export type ComponentStateType = {
  componentList: Array<ComponentInfoType>;
  selectedId: string;
  copiedComponent: ComponentInfoType | null;
};

const INIT_STATE: ComponentStateType = {
  componentList: [],
  selectedId: "",
  copiedComponent: null,
};

export const componentsSlice = createSlice({
  name: "components",
  initialState: INIT_STATE,
  reducers: {
    resetComponents: (
      state: ComponentStateType,
      action: PayloadAction<ComponentStateType>,
    ) => {
      return action.payload;
    },
    changeSelectedId: produce(
      (draft: ComponentStateType, action: PayloadAction<string>) => {
        draft.selectedId = action.payload;
      },
    ),
    addComponent: produce(
      (draft: ComponentStateType, action: PayloadAction<ComponentInfoType>) => {
        const newComponent = action.payload;
        insertNewComponent(draft, newComponent);
      },
    ),
    changeComponentProps: produce(
      (
        draft: ComponentStateType,
        action: PayloadAction<{ fe_id: string; newProps: ComponentPropsType }>,
      ) => {
        const { fe_id, newProps } = action.payload;
        const selectedComponent = draft.componentList.find(
          (c) => c.fe_id === fe_id,
        );
        if (selectedComponent) {
          selectedComponent.props = {
            ...selectedComponent,
            ...newProps,
          };
        }
      },
    ),
    deleteComponent: produce((draft: ComponentStateType) => {
      removeSelectedComponent(draft);
    }),
    changeHiddenComponent: produce(
      (
        draft: ComponentStateType,
        action: PayloadAction<{ fe_id: string; isHidden: boolean }>,
      ) => {
        const { componentList = [] } = draft;
        const { fe_id, isHidden } = action.payload;

        let newSelectedId = "";
        if (isHidden) {
          newSelectedId = getNextSelectedId(fe_id, componentList);
        } else {
          newSelectedId = fe_id;
        }
        draft.selectedId = newSelectedId;

        const selectedComponent = componentList.find((c) => c.fe_id === fe_id);
        if (selectedComponent) selectedComponent.isHidden = isHidden;
      },
    ),
    toggleComponentLock: produce(
      (draft: ComponentStateType, action: PayloadAction<{ fe_id: string }>) => {
        const { fe_id } = action.payload;

        const selectedComponent = draft.componentList.find(
          (c) => c.fe_id === fe_id,
        );
        if (selectedComponent) {
          selectedComponent.isLocked = !selectedComponent.isLocked;
        }
      },
    ),
    copyComponent: produce((draft: ComponentStateType) => {
      getCopiedComponent(draft);
    }),
    pasteComponent: produce((draft: ComponentStateType) => {
      const { copiedComponent } = draft;
      if (copiedComponent == null) return;

      copiedComponent.fe_id = nanoid();

      insertNewComponent(draft, copiedComponent);
    }),
    selectedPrevComponent: produce((draft: ComponentStateType) => {
      const { selectedId, componentList } = draft;
      const selectedIndex = componentList.findIndex(
        (c) => c.fe_id === selectedId,
      );

      if (selectedIndex < 0) return;
      if (selectedIndex <= 0) return;

      draft.selectedId = componentList[selectedIndex - 1].fe_id;
    }),
    selectedNextComponent: produce((draft: ComponentStateType) => {
      const { selectedId, componentList } = draft;
      const selectedIndex = componentList.findIndex(
        (c) => c.fe_id === selectedId,
      );

      if (selectedIndex < 0) return;
      if (selectedIndex >= componentList.length) return;

      draft.selectedId = componentList[selectedIndex + 1].fe_id;
    }),
    cutComponent: produce((draft: ComponentStateType) => {
      getCopiedComponent(draft);
      removeSelectedComponent(draft);
    }),
    changeComponentTitle: produce(
      (
        draft: ComponentStateType,
        action: PayloadAction<{ fe_id: string; title: string }>,
      ) => {
        const { title, fe_id } = action.payload;

        const selectedComponent = draft.componentList.find(
          (c) => c.fe_id === fe_id,
        );
        if (selectedComponent) {
          selectedComponent.title = title;
        }
      },
    ),
    moveComponent: produce(
      (
        draft: ComponentStateType,
        action: PayloadAction<{ oldIndex: number; newIndex: number }>,
      ) => {
        const { componentList } = draft;
        const { oldIndex, newIndex } = action.payload;

        draft.componentList = arrayMove(componentList, oldIndex, newIndex);
      },
    ),
  },
});

export const {
  resetComponents,
  changeSelectedId,
  addComponent,
  changeComponentProps,
  deleteComponent,
  changeHiddenComponent,
  toggleComponentLock,
  copyComponent,
  pasteComponent,
  selectedNextComponent,
  selectedPrevComponent,
  cutComponent,
  changeComponentTitle,
  moveComponent,
} = componentsSlice.actions;
export default componentsSlice.reducer;
