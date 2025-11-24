import type { FC } from "react";
import type { QuestionInputPropType } from "./QuestionInput";
import QuestionInputConf from "./QuestionInput";
import type { QuestionTitlePropType } from "./QuestionTitle";
import QuestionTitleConf from "./QuestionTitle";
import type { QuestionParagraphPropsType } from "./QuestionParagraph";
import QuestionParagraphConf from "./QuestionParagraph";
import type { QuestionInfoPropsType } from "./QuestionInfo";
import QuestionInfoConf from "./QuestionInfo";
import type { QuestionTextareaPropType } from "./QuestionTextarea";
import QuestionTextareaConf from "./QuestionTextarea";
import type {
  QuestionRadioPropsType,
  QuestionRadioStatPropsType,
} from "./QuestionRadio";
import QuestionRadioConf from "./QuestionRadio";
import type {
  QuestionCheckboxPropsType,
  QuestionCheckboxStatPropsType,
} from "./QuestionCheckbox";
import QuestionCheckboxConf from "./QuestionCheckbox";
// 统一 各个组件的 prop type
export type ComponentPropsType = QuestionInputPropType &
  QuestionTitlePropType &
  QuestionParagraphPropsType &
  QuestionInfoPropsType &
  QuestionTextareaPropType &
  QuestionRadioPropsType &
  QuestionCheckboxPropsType;

type ComponentStatPropsType = QuestionRadioStatPropsType &
  QuestionCheckboxStatPropsType;

// 统一 组件的配置 type
export type ComponentConfType = {
  title: string;
  type: string;
  Component: FC<ComponentPropsType>;
  PropComponent: FC<ComponentPropsType>;
  defaultProps: ComponentPropsType;
  StatComponent?: FC<ComponentStatPropsType>;
};

// 全部的组件配置的列表
const componentConfList: ComponentConfType[] = [
  QuestionInputConf,
  QuestionTitleConf,
  QuestionParagraphConf,
  QuestionInfoConf,
  QuestionTextareaConf,
  QuestionRadioConf,
  QuestionCheckboxConf,
];

// 组件类型分组
export const componentConfGroup = [
  {
    groupId: "text",
    groupName: "文本显示",
    components: [QuestionTitleConf, QuestionParagraphConf, QuestionInfoConf],
  },
  {
    groupId: "input",
    groupName: "用户输入",
    components: [QuestionInputConf, QuestionTextareaConf],
  },
  {
    groupId: "chooseGroup",
    groupName: "用户选择",
    components: [QuestionRadioConf, QuestionCheckboxConf],
  },
];

export function getComponentConfByType(type: string) {
  return componentConfList.find((c) => c.type === type);
}
