import { render, screen } from "@testing-library/react";
import QuestionInfo from "./Component";

// 测试默认属性
test("默认属性", () => {
  render(<QuestionInfo />);

  // 检查默认标题
  const titleElement = screen.getByText("问卷标题");
  expect(titleElement).toBeInTheDocument();

  // 检查默认描述
  const descriptionElement = screen.getByText("问卷描述");
  expect(descriptionElement).toBeInTheDocument();
});

// 测试自定义属性
test("自定义标题和描述", () => {
  const customTitle = "我的问卷";
  const customDescription = "这是自定义描述";

  render(<QuestionInfo title={customTitle} description={customDescription} />);

  // 检查自定义标题
  const titleElement = screen.getByText(customTitle);
  expect(titleElement).toBeInTheDocument();

  // 检查自定义描述
  const descriptionElement = screen.getByText(customDescription);
  expect(descriptionElement).toBeInTheDocument();
});
