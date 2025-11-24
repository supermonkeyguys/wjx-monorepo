import { render, screen } from "@testing-library/react";
import QuestionCheckbox from "./Component";

// 测试默认属性
test("默认属性", () => {
  render(<QuestionCheckbox />);

  expect(screen.getByText(/多选框/)).toBeInTheDocument();
  expect(screen.getByText(/^选项1$/)).toBeInTheDocument(); // ✅ 精确匹配
  expect(screen.getByText(/^选项2$/)).toBeInTheDocument();
  expect(screen.getByText(/^选项3$/)).toBeInTheDocument();

  const spaceElement = screen.getByText(/^选项1$/).closest(".ant-space");
  expect(spaceElement).toHaveClass("ant-space-horizontal");
});

// 测试垂直布局
test("垂直布局", () => {
  render(<QuestionCheckbox isVertical={true} />);

  const spaceElement = screen.getByText(/^选项1$/).closest(".ant-space");
  expect(spaceElement).toHaveClass("ant-space-vertical");
});

// 测试自定义选项
test("自定义选项", () => {
  const customList = [
    { value: "a", text: "自定义选项A", checked: false },
    { value: "b", text: "自定义选项B", checked: true },
  ];

  render(<QuestionCheckbox list={customList} />);

  expect(screen.getByText(/^自定义选项A$/)).toBeInTheDocument();
  expect(screen.getByText(/^自定义选项B$/)).toBeInTheDocument();
});

// 测试选中状态
test("选中状态显示", () => {
  const listWithChecked = [
    { value: "item1", text: "选项1", checked: false },
    { value: "item2", text: "选项2", checked: true },
  ];

  render(<QuestionCheckbox list={listWithChecked} />);

  const checkboxItem2 = screen
    .getByText(/^选项2$/)
    .closest(".ant-checkbox-wrapper");
  expect(checkboxItem2).toHaveClass("ant-checkbox-wrapper-checked");
});

// 测试组合属性
test("组合属性：自定义标题 + 垂直 + 自定义选项 + 选中状态", () => {
  const customList = [
    { value: "yes", text: "同意", checked: true },
    { value: "no", text: "不同意", checked: false },
  ];

  render(
    <QuestionCheckbox
      title="请选择同意项"
      isVertical={true}
      list={customList}
    />,
  );

  expect(screen.getByText(/请选择同意项/)).toBeInTheDocument();

  // ✅ 使用精确匹配避免歧义
  expect(screen.getByText(/^同意$/)).toBeInTheDocument();
  expect(screen.getByText(/^不同意$/)).toBeInTheDocument();

  const spaceElement = screen.getByText(/^同意$/).closest(".ant-space");
  expect(spaceElement).toHaveClass("ant-space-vertical");

  const checkboxYes = screen
    .getByText(/^同意$/)
    .closest(".ant-checkbox-wrapper");
  expect(checkboxYes).toHaveClass("ant-checkbox-wrapper-checked");
});

// ========== 空值测试 ==========

// 测试空标题
test("空标题", () => {
  const { container } = render(<QuestionCheckbox title="" />);

  const typographyElement = container.querySelector(".ant-typography");
  expect(typographyElement).toBeInTheDocument();
  expect(typographyElement?.textContent).toBe("");
});

// 测试空选项数组
test("空选项数组", () => {
  render(<QuestionCheckbox list={[]} />);

  expect(screen.getByText(/多选框/)).toBeInTheDocument();
  expect(screen.queryByText(/^选项1$/)).not.toBeInTheDocument();
});

// 测试 undefined 选项
test("undefined 选项", () => {
  render(<QuestionCheckbox list={undefined} />);

  expect(screen.queryByText(/^选项1$/)).not.toBeInTheDocument();
});

// 测试空值组合
test("空值组合：空标题 + 空选项", () => {
  const { container } = render(<QuestionCheckbox title="" list={[]} />);

  const typographyElement = container.querySelector(".ant-typography");
  expect(typographyElement?.textContent).toBe("");

  expect(screen.queryByText(/^选项1$/)).not.toBeInTheDocument();
});
