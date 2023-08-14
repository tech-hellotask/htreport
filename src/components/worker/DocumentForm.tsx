import { Form, Input, Button, Select, Switch, Upload } from "antd";
import { FormItem } from "../../lib/form";
import { InboxOutlined } from "@ant-design/icons";
import { FileType } from "../../utils/types";

export default function WorkerDocumentForm() {
  const [form] = Form.useForm();

  const normFile = (_e: { file: FileType; fileList: FileType[] }) => {
    console.log("Upload event:", _e);

    if (_e.fileList.length > 1) {
      _e.fileList.shift();
    }

    return _e && _e.fileList;
  };

  return (
    <Form
      form={form}
      layout="vertical"
      //   onFinish={onFinish}
      className="box-light"
    >
      <h1 className="box-title">Worker Document</h1>
      <Form.Item label="Image">
        <Form.Item
          name="image"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          noStyle
        >
          <Upload.Dragger multiple={false}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-hint">
              Click or drag file to this area to upload
            </p>
          </Upload.Dragger>
        </Form.Item>
      </Form.Item>
      <FormItem
        name="type"
        label="Document Type"
        rules={[{ required: true, message: "Please select type" }]}
      >
        <Select placeholder="Select Category" showSearch allowClear>
          <Select.Option value="nid">NID</Select.Option>
          <Select.Option value="birth_certificate">
            Birth Certificate
          </Select.Option>
          <Select.Option value="passport">Passport</Select.Option>
          <Select.Option value="driving_license">Driving License</Select.Option>
        </Select>
      </FormItem>
      <FormItem
        name="number"
        label="Number"
        rules={[{ required: true, message: "Please input document number" }]}
      >
        <Input placeholder="Number" />
      </FormItem>
      <Form.Item
        name="isGuarantor"
        label="Is Guarantor"
        valuePropName="checked"
      >
        <Switch checkedChildren="Yes" unCheckedChildren="No" defaultChecked />
      </Form.Item>
      <FormItem name="physicalDisability" label="Physical Disability">
        <Input placeholder="Physical Disability" />
      </FormItem>
      <Form.Item style={{ textAlign: "right" }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
