import type { FC } from "react";
import {
  QuestionInputDefaultProp,
  type QuestionInputPropType,
} from "./interface";
import { Input, Typography } from "antd";

const { Paragraph } = Typography;

const QuestionInput: FC<QuestionInputPropType> = (
  props: QuestionInputPropType,
) => {
  const { title = "", placeholder = "" } = {
    ...QuestionInputDefaultProp,
    ...props,
  };

  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <div>
        <Input placeholder={placeholder}></Input>
      </div>
    </div>
  );
};

export default QuestionInput;
