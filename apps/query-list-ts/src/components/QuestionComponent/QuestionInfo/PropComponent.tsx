import { useEffect, type FC } from "react";
import type { QuestionInfoPropsType } from "./interface";
import { Form, Input } from "antd";

const { TextArea } = Input;

const PropComponent: FC<QuestionInfoPropsType> = (
  props: QuestionInfoPropsType,
) => {
  const { title, description, onChange, disabled } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ title, description });
  }, [title, description]);

  function handleValuesChange() {
    if (onChange) onChange(form.getFieldsValue());
  }

  return (
    <Form
      layout="vertical"
      initialValues={{ title, description }}
      form={form}
      onValuesChange={handleValuesChange}
      disabled={disabled}
    >
      <Form.Item name="title" label="问卷标题">
        <Input />
      </Form.Item>
      <Form.Item name="description" label="问卷简介">
        <TextArea />
      </Form.Item>
    </Form>
  );
};

export default PropComponent;
