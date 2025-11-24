import type { QuestionRadioPropsType as Shared } from '@Cookie-repo/types';

export type QuestionRadioPropsType = Shared & {
  onChange?: (newProps: QuestionRadioPropsType) => void;
  disabled?: boolean;
};

export type { RadioOptionType } from '@Cookie-repo/types'
export { QuestionRadioDefaultProps } from '@Cookie-repo/common'

export type QuestionRadioStatPropsType = {
  stat: Array<{ name: string; count: number }>;
};
