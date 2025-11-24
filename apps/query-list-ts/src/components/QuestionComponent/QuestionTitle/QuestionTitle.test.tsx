import { render, screen } from "@testing-library/react";
import QuestionTitle from "./Component";

// 测试默认属性
test("默认属性", () => {
  render(<QuestionTitle />);

  // 检查默认文本
  const titleElement = screen.getByText("一行标题");
  expect(titleElement).toBeInTheDocument();

  // 检查默认样式（通过内联样式验证）
  expect(titleElement).toHaveStyle({
    textAlign: "start",
    fontSize: "24px",
    marginBottom: "0",
  });
});

// 测试自定义文本
test("自定义文本", () => {
  const customText = "自定义标题";
  render(<QuestionTitle text={customText} />);

  const titleElement = screen.getByText(customText);
  expect(titleElement).toBeInTheDocument();
});

// 测试标题级别（level）
test("标题级别 level=2", () => {
  render(<QuestionTitle level={2} />);

  const titleElement = screen.getByText("一行标题");
  expect(titleElement).toHaveStyle({ fontSize: "20px" });
});

test("标题级别 level=3", () => {
  render(<QuestionTitle level={3} />);

  const titleElement = screen.getByText("一行标题");
  expect(titleElement).toHaveStyle({ fontSize: "16px" });
});

// 测试居中对齐
test("居中对齐", () => {
  render(<QuestionTitle isCenter={true} />);

  const titleElement = screen.getByText("一行标题");
  expect(titleElement).toHaveStyle({ textAlign: "center" });
});

// 测试组合属性
test("组合属性：自定义文本 + level=2 + 居中", () => {
  const customText = "组合测试标题";
  render(<QuestionTitle text={customText} level={2} isCenter={true} />);

  const titleElement = screen.getByText(customText);
  expect(titleElement).toBeInTheDocument();
  expect(titleElement).toHaveStyle({
    fontSize: "20px",
    textAlign: "center",
  });
});
