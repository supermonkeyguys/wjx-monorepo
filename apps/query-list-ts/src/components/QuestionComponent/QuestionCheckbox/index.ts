import Component from "./Component";
import { QuestionCheckboxDefaultProps } from "./interface";
import PropComponent from "./PropComponent";
import StatComponent from "./StatComponent";

export * from "./interface";

export default {
  title: "多选框",
  type: "questionCheckbox",
  Component,
  PropComponent,
  defaultProps: QuestionCheckboxDefaultProps,
  StatComponent,
};
