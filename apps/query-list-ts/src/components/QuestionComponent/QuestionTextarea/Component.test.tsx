import { render, screen } from "@testing-library/react";
import QuestionTextarea from "./Component"; // 根据你的实际文件名调整

// 测试默认属性
test("默认属性", () => {
  render(<QuestionTextarea />);

  // 验证默认标题
  expect(screen.getByText("输入框标题")).toBeInTheDocument();

  // 验证默认 placeholder
  expect(screen.getByPlaceholderText("请输入...")).toBeInTheDocument();
});

// 测试自定义标题
test("自定义标题", () => {
  render(<QuestionTextarea title="自定义多行标题" />);
  expect(screen.getByText("自定义多行标题")).toBeInTheDocument();
});

// 测试自定义 placeholder
test("自定义 placeholder", () => {
  render(<QuestionTextarea placeholder="请详细描述..." />);
  expect(screen.getByPlaceholderText("请详细描述...")).toBeInTheDocument();
});

// 测试组合属性
test("组合属性", () => {
  render(<QuestionTextarea title="反馈意见" placeholder="请输入您的建议" />);

  expect(screen.getByText("反馈意见")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("请输入您的建议")).toBeInTheDocument();
});
