import type { FC } from "react";

import { Input, Typography } from "antd";
import {
  QuestionTextareaDefaultProp,
  type QuestionTextareaPropType,
} from "./interface";

const { Paragraph } = Typography;
const { TextArea } = Input;

const QuestionTextarea: FC<QuestionTextareaPropType> = (
  props: QuestionTextareaPropType,
) => {
  const { title = "", placeholder = "" } = {
    ...QuestionTextareaDefaultProp,
    ...props,
  };

  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <div>
        <TextArea placeholder={placeholder}></TextArea>
      </div>
    </div>
  );
};

export default QuestionTextarea;
