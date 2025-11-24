import Component from "./Component";
import { QuestionTitleDefaultProp } from "./interface";
import PropComponent from "./PropComponent";

export * from "./interface";

export default {
  title: "输入框",
  type: "questionTitle",
  Component,
  PropComponent,
  defaultProps: QuestionTitleDefaultProp,
};
