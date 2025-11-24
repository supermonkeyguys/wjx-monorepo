import type { QuestionTextareaPropsType as Shared } from '@Cookie-repo/types';

export type QuestionTextareaPropType = Shared & {
  onChange?: (newProps: QuestionTextareaPropType) => void;
  disable?: boolean;
};

export { QuestionTextareaDefaultProp } from '@Cookie-repo/common'
