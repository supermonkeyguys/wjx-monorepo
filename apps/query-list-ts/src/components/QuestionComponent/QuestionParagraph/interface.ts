import type { QuestionParagraphPropsType as Shared } from "@Cookie-repo/types";

export type QuestionParagraphPropsType = Shared & {
  onChange?: (newProps: QuestionParagraphPropsType) => void;
  disabled?: boolean;
};

export { QuestionParagraphDefaultProps } from "@Cookie-repo/common";
