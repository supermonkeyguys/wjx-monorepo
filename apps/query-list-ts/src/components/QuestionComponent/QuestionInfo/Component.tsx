import type { FC } from "react";
import {
  QuestionInfoDefaultProps,
  type QuestionInfoPropsType,
} from "./interface";
import { Typography } from "antd";

const { Title, Paragraph } = Typography;

const QuestionInfo: FC<QuestionInfoPropsType> = (
  props: QuestionInfoPropsType,
) => {
  const { title, description } = { ...QuestionInfoDefaultProps, ...props };

  const textList = description.split("\n");

  return (
    <div style={{ textAlign: "center" }}>
      <Title style={{ fontSize: "24px" }}>{title}</Title>
      <Paragraph>
        {textList.map((t, i) => (
          <span key={t}>
            {i > 0 && <br />}
            {t}
          </span>
        ))}
      </Paragraph>
    </div>
  );
};

export default QuestionInfo;
