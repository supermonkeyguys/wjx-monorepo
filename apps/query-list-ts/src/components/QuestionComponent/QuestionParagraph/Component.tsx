import type { FC } from "react";
import {
  QuestionParagraphDefaultProps,
  type QuestionParagraphPropsType,
} from "./interface";
import { Typography } from "antd";

const { Paragraph } = Typography;

const QuestionParagraph: FC<QuestionParagraphPropsType> = (
  props: QuestionParagraphPropsType,
) => {
  const { text = "", isCenter = false } = {
    ...QuestionParagraphDefaultProps,
    ...props,
  };

  const textList = text.split("\n");

  return (
    <Paragraph
      style={{ textAlign: isCenter ? "center" : "start", marginBottom: "0" }}
    >
      {textList.map((t, i) => (
        <span key={t}>
          {i > 0 && <br />}
          {t}
        </span>
      ))}
    </Paragraph>
  );
};

export default QuestionParagraph;
