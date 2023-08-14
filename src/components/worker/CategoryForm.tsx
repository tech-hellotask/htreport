import { Form } from "antd";
import { FormItem } from "../../lib/form";
import { Input } from "antd";
import { Button } from "antd";

export default function WorkerCategoryForm() {
  const [form] = Form.useForm();
  return (
    <Form
      form={form}
      layout="vertical"
      // onFinish={onFinish}
      className="box-light"
    >
      <h1 className="box-title">Create Worker Category</h1>
      <FormItem
        name="name"
        label="Name"
        rules={[{ required: true, message: "Please input name!" }]}
      >
        <Input placeholder="Ex: Domestic Worker" />
      </FormItem>
      <Form.Item style={{ textAlign: "right" }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
