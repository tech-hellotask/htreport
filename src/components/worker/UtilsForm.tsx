import { Form, Select, Switch, Row, Col } from "antd";
import { FormItem } from "../../lib/form";
import { Input } from "antd";
import { Button } from "antd";

export default function WorkerUtilsForm() {
  const [form] = Form.useForm();
  return (
    <Form
      form={form}
      layout="vertical"
      // onFinish={onFinish}
      className="box-light"
    >
      <h1 className="box-title">Create Worker Utils</h1>
      <Row gutter={[16, 10]}>
        <Col span={12}>
          <FormItem
            name="categoryId"
            label="Worker Category"
            rules={[{ required: true, message: "Please select category" }]}
          >
            <Select placeholder="Select Category" showSearch allowClear>
              <Select.Option value="1">Carpenter</Select.Option>
              <Select.Option value="1">Carpenter</Select.Option>
              <Select.Option value="1">Carpenter</Select.Option>
              <Select.Option value="1">Carpenter</Select.Option>
            </Select>
          </FormItem>
          <FormItem
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please input name!" }]}
          >
            <Input placeholder="Name" />
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem
            name="type"
            label="Type"
            rules={[{ required: true, message: "Please input name!" }]}
          >
            <Select placeholder="Select Type" showSearch allowClear>
              <Select.Option value="1">Worker Service</Select.Option>
              <Select.Option value="1">Worker Type</Select.Option>
              <Select.Option value="1">Worker Level</Select.Option>
            </Select>
          </FormItem>
          <Form.Item name="isActive" label="Is Active" valuePropName="checked">
            <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item style={{ textAlign: "right" }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
