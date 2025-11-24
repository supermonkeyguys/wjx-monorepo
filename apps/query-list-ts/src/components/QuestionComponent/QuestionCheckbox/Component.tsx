import type { FC } from "react";
import {
  QuestionCheckboxDefaultProps,
  type OptionType,
  type QuestionCheckboxPropsType,
} from "./interface";
import { Checkbox, Space, Typography } from "antd";

const { Paragraph } = Typography;

const QuestionCheckbox: FC<QuestionCheckboxPropsType> = (
  props: QuestionCheckboxPropsType,
) => {
  const {
    title,
    isVertical,
    list = [],
  } = { ...QuestionCheckboxDefaultProps, ...props };

  return (
    <div>
      <Paragraph>{title}</Paragraph>
      <Space direction={isVertical ? "vertical" : "horizontal"}>
        {list.map(({ value, text, checked }: OptionType) => {
          return (
            <Checkbox key={value} value={value} checked={checked}>
              {text}
            </Checkbox>
          );
        })}
      </Space>
    </div>
  );
};

export default QuestionCheckbox;
