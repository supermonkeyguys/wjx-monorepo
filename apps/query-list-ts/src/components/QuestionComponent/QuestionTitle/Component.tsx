import type { FC } from "react";
import {
  QuestionTitleDefaultProp,
  type QuestionTitlePropsType,
} from "./interface";
import { Typography } from "antd";

const { Title } = Typography;

const QuestionTitle: FC<QuestionTitlePropsType> = (
  props: QuestionTitlePropsType,
) => {
  const {
    text = "",
    level = 1,
    isCenter = false,
  } = { ...QuestionTitleDefaultProp, ...props };

  const getFontSize = (level: number) => {
    if (level === 1) return "28px";
    if (level === 2) return "24px";
    if (level === 3) return "20px";
    return "16px";
  };

  return (
    <Title
      level={level}
      style={{
        textAlign: isCenter ? "center" : "start",
        margin: 12,
        fontSize: getFontSize(level),
      }}
    >
      {text}
    </Title>
  );
};

export default QuestionTitle;
