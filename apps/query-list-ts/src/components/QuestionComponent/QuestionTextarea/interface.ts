export type QuestionTextareaPropType = {
  title?: string;
  placeholder?: string;

  onChange?: (newProps: QuestionTextareaPropType) => void;
  disable?: boolean;
};

export const QuestionTextareaDefaultProp: QuestionTextareaPropType = {
  title: "输入框标题",
  placeholder: "请输入...",
};
