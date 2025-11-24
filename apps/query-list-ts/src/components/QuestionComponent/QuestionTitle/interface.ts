import type { QuestionTitlePropsType as Shared } from '@Cookie-repo/types';

export type QuestionTitlePropsType = Shared & {
  onChange?: (newProps: QuestionTitlePropsType) => void;
  disable?: boolean;
};

export { QuestionTitleDefaultProp } from '@Cookie-repo/common'