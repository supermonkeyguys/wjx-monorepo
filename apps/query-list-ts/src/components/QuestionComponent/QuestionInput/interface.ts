import type { QuestionInputPropsType as SharedProps } from '@Cookie-repo/types';

export type QuestionInputPropType = SharedProps & {
  onChange?: (newProps: QuestionInputPropType) => void;
  disable?: boolean;
};

export { QuestionInputDefaultProp } from '@Cookie-repo/common';