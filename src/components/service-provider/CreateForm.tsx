import { Form, Select } from "antd";
import { FormItem } from "../../lib/form";
import { Input } from "antd";
import { Button } from "antd";

export default function ServiceProviderForm() {
  const [form] = Form.useForm();
  return (
    <Form
      form={form}
      layout="vertical"
      // onFinish={onFinish}
      className="box-light"
    >
      <h1 className="box-title">Add New Service Provider</h1>
      <FormItem
        name="name"
        label="Name"
        rules={[{ required: true, message: "Please input name!" }]}
      >
        <Input placeholder="Ex: Dhaka, xyz" />
      </FormItem>
      <FormItem
        name="code"
        label="Code"
        rules={[{ required: true, message: "Please input code!" }]}
      >
        <Input placeholder="Ex: unique code" />
      </FormItem>
      <Form.Item
        name="countryName"
        label="Country"
        rules={[{ required: true, message: "Please select country!" }]}
      >
        <Select placeholder="Select Country" showSearch allowClear>
          <Select.Option value="1">Bangladesh</Select.Option>
          <Select.Option value="1">Singapore</Select.Option>
          <Select.Option value="1">India</Select.Option>
          <Select.Option value="1">Pakistan</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        name="currency"
        label="Currency"
        rules={[{ required: true, message: "Please select currency!" }]}
      >
        <Select placeholder="Select Currency" showSearch allowClear>
          <Select.Option value="BDT">BDT</Select.Option>
          <Select.Option value="USD">USD</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item style={{ textAlign: "right" }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
