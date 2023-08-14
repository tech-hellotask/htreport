import { Form, Input, Button, Space } from "antd";
import { FormItem } from "../../lib/form";

export default function WorkerPaymentMethod() {
  const [form] = Form.useForm();
  return (
    <Form
      form={form}
      layout="vertical"
      // onFinish={onFinish}
      className="box-light"
    >
      <h1 className="box-title">Worker Payment Method</h1>
      <FormItem
        name="name"
        label="Name"
        rules={[{ required: true, message: "Please input name!" }]}
      >
        <Input placeholder="Ex: Bkash" />
      </FormItem>
      <FormItem
        name="accountNumber"
        label="Account Number"
        rules={[{ required: true, message: "Please input account number!" }]}
      >
        <Input placeholder="xxxxxxxxxxx" />
      </FormItem>
      <Form.List name="info">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <div key={key}>
                <Space>
                  <Form.Item
                    {...restField}
                    name={[name, "name"]}
                    rules={[{ required: true, message: "Missing name" }]}
                  >
                    <Input placeholder="Name" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "value"]}
                    rules={[{ required: true, message: "Missing value" }]}
                  >
                    <Input placeholder="Name" />
                  </Form.Item>
                  <Form.Item>
                    <Button onClick={() => remove(name)}>Remove</Button>
                  </Form.Item>
                </Space>
              </div>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                style={{ width: "100%" }}
              >
                Add field
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.Item style={{ textAlign: "right" }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
