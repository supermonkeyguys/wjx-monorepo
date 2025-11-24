import type { QuestionInfoPropsType as Shared } from '@Cookie-repo/types';

export type QuestionInfoPropsType = Shared & {
  onChange?: (newProps: QuestionInfoPropsType) => void;
  disabled?: boolean;
};

export { QuestionInfoDefaultProps } from '@Cookie-repo/common'