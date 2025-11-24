import { useEffect, type FC } from "react";
import type { QuestionInputPropType } from "./interface";
import { Form, Input } from "antd";

const PropComponent: FC<QuestionInputPropType> = (
  props: QuestionInputPropType,
) => {
  const { title, placeholder, onChange, disable } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ title, placeholder });
  }, [title, placeholder]);

  function handleValuesChange() {
    if (onChange) onChange(form.getFieldsValue());
  }

  return (
    <Form
      layout="vertical"
      initialValues={{ title, placeholder }}
      form={form}
      onValuesChange={handleValuesChange}
      disabled={disable}
    >
      <Form.Item
        label="标题"
        name="title"
        rules={[{ required: true, message: "请输入标题" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="Placeholder" name="placeholder">
        <Input />
      </Form.Item>
    </Form>
  );
};

export default PropComponent;
