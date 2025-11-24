// QuestionParagraph.test.tsx
import { render, screen } from "@testing-library/react";
import QuestionParagraph from "./Component";

// 测试默认属性
test("默认属性", () => {
  render(<QuestionParagraph />);

  // 获取所有 <p> 元素（Ant Design Paragraph 渲染为 <p>）
  const paragraph = screen.getByText("一行段落").parentElement;

  expect(paragraph).toBeInTheDocument();
  expect(paragraph).toHaveStyle({ textAlign: "start" });
});

// 测试居中对齐
test("居中对齐", () => {
  render(<QuestionParagraph isCenter={true} />);

  const paragraph = screen.getByText("一行段落").parentElement;

  expect(paragraph).toBeInTheDocument();
  expect(paragraph).toHaveStyle({ textAlign: "center" });
});

// 测试换行文本
test("换行文本处理", () => {
  const multiLineText = "第一行\n第二行";
  render(<QuestionParagraph text={multiLineText} />);

  expect(screen.getByText("第一行")).toBeInTheDocument();
  expect(screen.getByText("第二行")).toBeInTheDocument();
});

// 测试组合属性
test("组合属性：自定义文本 + 居中 + 换行", () => {
  const customText = "标题行\n内容行";
  render(<QuestionParagraph text={customText} isCenter={true} />);

  expect(screen.getByText("标题行")).toBeInTheDocument();
  expect(screen.getByText("内容行")).toBeInTheDocument();

  const paragraph = screen.getByText("标题行").parentElement;
  expect(paragraph).toHaveStyle({ textAlign: "center" });
});
