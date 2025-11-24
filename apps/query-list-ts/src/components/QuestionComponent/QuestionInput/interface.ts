import type { QuestionInputProps as SharedProps } from '@Cookie-repo/packages/types';

export type QuestionInputPropType = SharedProps & {
  onChange?: (newProps: QuestionInputPropType) => void;
  disable?: boolean;
};

// export const QuestionInputDefaultProp: QuestionInputPropType = {
//   title: "输入框标题",
//   placeholder: "请输入...",
// };
