import { render, screen } from "@testing-library/react";
import QuestionInput from "./Component";

// 测试默认属性
test("默认属性", () => {
  render(<QuestionInput />);

  // 检查默认标题
  const titleElement = screen.getByText("输入框标题");
  expect(titleElement).toBeInTheDocument();

  // 检查默认 placeholder
  const inputElement = screen.getByPlaceholderText("请输入...");
  expect(inputElement).toBeInTheDocument();
});

// 测试自定义标题
test("自定义标题", () => {
  const customTitle = "自定义输入框标题";
  render(<QuestionInput title={customTitle} />);

  const titleElement = screen.getByText(customTitle);
  expect(titleElement).toBeInTheDocument();
});

// 测试自定义 placeholder
test("自定义 placeholder", () => {
  const customPlaceholder = "请输入您的姓名";
  render(<QuestionInput placeholder={customPlaceholder} />);

  const inputElement = screen.getByPlaceholderText(customPlaceholder);
  expect(inputElement).toBeInTheDocument();
});

// 测试组合属性
test("组合属性：自定义标题 + 自定义 placeholder", () => {
  const customTitle = "邮箱地址";
  const customPlaceholder = "请输入邮箱";

  render(<QuestionInput title={customTitle} placeholder={customPlaceholder} />);

  // 检查标题
  const titleElement = screen.getByText(customTitle);
  expect(titleElement).toBeInTheDocument();

  // 检查 placeholder
  const inputElement = screen.getByPlaceholderText(customPlaceholder);
  expect(inputElement).toBeInTheDocument();
});
