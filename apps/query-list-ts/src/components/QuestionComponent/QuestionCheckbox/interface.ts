import type { QuestionCheckboxPropsType as Shared, } from '@Cookie-repo/types';

export type QuestionCheckboxPropsType = Shared & {
  onChange?: (newProps: QuestionCheckboxPropsType) => void;
  disabled?: boolean;
};

export { QuestionCheckboxDefaultProps } from '@Cookie-repo/common';
export type { OptionType } from '@Cookie-repo/types';

export type QuestionCheckboxStatPropsType = {
  stat: Array<{ name: string; count: string }>;
};
