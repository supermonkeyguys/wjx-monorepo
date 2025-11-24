import Component from "./Component";
import { QuestionInfoDefaultProps } from "./interface";
import PropComponent from "./PropComponent";

export * from "./interface";

export default {
  title: "问卷简介",
  type: "questionInfo",
  Component,
  PropComponent,
  defaultProps: QuestionInfoDefaultProps,
};
