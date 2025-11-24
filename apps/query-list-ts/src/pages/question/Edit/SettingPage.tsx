import { Form, Input } from "antd";
import { useEffect, type FC } from "react";
import useGetPageInfo from "../../../Hooks/useGetPageInfo";
import { useDispatch } from "react-redux";
import { resetPageInfo } from "../../../store/pageInfoReducer";

const { TextArea } = Input;

const SettingPage: FC = () => {
  const dispatch = useDispatch();
  const { title, desc, js, css } = useGetPageInfo();
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ title, desc, js, css });
  }, [title, desc, js, css]);

  function handleValuesChange() {
    dispatch(resetPageInfo(form.getFieldsValue()));
  }

  return (
    <Form
      layout="vertical"
      initialValues={{ title, desc, js, css }}
      onValuesChange={handleValuesChange}
      form={form}
    >
      <Form.Item
        label="问卷标题"
        name="title"
        rules={[{ required: true, message: "页面标题不能为空" }]}
      >
        <Input value={title} />
      </Form.Item>
      <Form.Item label="问卷描述" name="desc">
        <TextArea placeholder={desc}></TextArea>
      </Form.Item>
      <Form.Item label="样式代码" name="css">
        <TextArea placeholder={css}></TextArea>
      </Form.Item>
      <Form.Item label="脚本代码" name="js">
        <TextArea placeholder={js}></TextArea>
      </Form.Item>
    </Form>
  );
};

export default SettingPage;
