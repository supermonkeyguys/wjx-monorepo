import { configureStore } from "@reduxjs/toolkit";
import userReducer, { type UserStateType } from "./userSlice";
import componentsReducer, { type ComponentStateType } from "./componentReducer";
import pageInfoReducer, { type PageInfoType } from "./pageInfoReducer";
import type { StateWithHistory } from "redux-undo";
import undoable, { excludeAction } from "redux-undo";

export type StateType = {
  user: UserStateType;
  components: StateWithHistory<ComponentStateType>;
  pageInfo: PageInfoType;
};

export const store = configureStore({
  reducer: {
    user: userReducer,
    components: undoable(componentsReducer, {
      limit: 20,
      filter: excludeAction([
        "component/resetComponents",
        "component/changeSelectedId",
        "component/selectedPrevComponent",
        "component/selectedNextComponent",
      ]),
    }),
    pageInfo: pageInfoReducer,
  },
});
