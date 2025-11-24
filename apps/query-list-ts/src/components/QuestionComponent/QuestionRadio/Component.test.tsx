import { render, screen } from "@testing-library/react";
import QuestionRadio from "./Component";

// 测试默认属性
test("默认属性", () => {
  render(<QuestionRadio />);

  // 验证默认标题
  expect(screen.getByText("单选标题")).toBeInTheDocument();

  // 验证默认选项
  expect(screen.getByText("选项1")).toBeInTheDocument();
  expect(screen.getByText("选项2")).toBeInTheDocument();
  expect(screen.getByText("选项3")).toBeInTheDocument();

  // 验证默认水平布局（通过 Space 容器）
  const spaceElement = screen.getByText("选项1").closest(".ant-space");
  expect(spaceElement).toHaveClass("ant-space-horizontal");
});

// 测试垂直布局
test("垂直布局", () => {
  render(<QuestionRadio isVertical={true} />);

  // 验证选项存在
  expect(screen.getByText("选项1")).toBeInTheDocument();

  // 验证垂直布局样式
  const spaceElement = screen.getByText("选项1").closest(".ant-space");
  expect(spaceElement).toHaveClass("ant-space-vertical");
});

// 测试自定义选项
test("自定义选项", () => {
  const customOptions = [
    { value: "a", text: "自定义选项A" },
    { value: "b", text: "自定义选项B" },
  ];

  render(<QuestionRadio options={customOptions} />);

  expect(screen.getByText("自定义选项A")).toBeInTheDocument();
  expect(screen.getByText("自定义选项B")).toBeInTheDocument();
});

// 测试选中值
test("选中值显示", () => {
  render(<QuestionRadio value="item2" />);

  // 验证选项2被选中（Ant Design 会给选中项加 .ant-radio-checked）
  const radioItem2 = screen.getByText("选项2").closest(".ant-radio-wrapper");
  expect(radioItem2).toHaveClass("ant-radio-wrapper-checked");
});

// 测试组合属性
test("组合属性：自定义标题 + 垂直 + 自定义选项 + 选中值", () => {
  const customOptions = [
    { value: "yes", text: "是" },
    { value: "no", text: "否" },
  ];

  render(
    <QuestionRadio
      title="您是否同意？"
      isVertical={true}
      options={customOptions}
      value="yes"
    />,
  );

  // 验证标题
  expect(screen.getByText("您是否同意？")).toBeInTheDocument();

  // 验证选项
  expect(screen.getByText("是")).toBeInTheDocument();
  expect(screen.getByText("否")).toBeInTheDocument();

  // 验证垂直布局
  const spaceElement = screen.getByText("是").closest(".ant-space");
  expect(spaceElement).toHaveClass("ant-space-vertical");

  // 验证选中状态
  const radioYes = screen.getByText("是").closest(".ant-radio-wrapper");
  expect(radioYes).toHaveClass("ant-radio-wrapper-checked");
});

// 测试空标题
test("空标题", () => {
  const { container } = render(<QuestionRadio title="" />);

  const typographyElement = container.querySelector(".ant-typography");
  expect(typographyElement).toBeInTheDocument();
  expect(typographyElement?.textContent).toBe("");
});

// 测试空选项数组
test("空选项数组", () => {
  render(<QuestionRadio options={[]} />);

  expect(screen.getByText(/单选标题/)).toBeInTheDocument();
  expect(screen.queryByText(/选项1/)).not.toBeInTheDocument();
});

// 测试 undefined 选项
test("undefined 选项", () => {
  render(<QuestionRadio options={undefined} />);

  // 选项应该不存在（因为 options = []）
  expect(screen.queryByText(/选项1/)).not.toBeInTheDocument();
});

// 测试空值组合
test("空值组合：空标题 + 空选项", () => {
  const { container } = render(<QuestionRadio title="" options={[]} />);

  const typographyElement = container.querySelector(".ant-typography");
  expect(typographyElement?.textContent).toBe("");

  expect(screen.queryByText(/选项1/)).not.toBeInTheDocument();
});
