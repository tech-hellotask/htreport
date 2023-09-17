import { Col, Input, Select, Switch } from "antd";
import { FormItem } from "../../../lib/form";

export default function BasicInfo() {
  return (
    <Col span={24} md={12} xl={8}>
      <div className="box-light">
        <h3 className="box-title">Basic Info</h3>
        <FormItem name="name" label="Title" required={true}>
          <Input placeholder="Ex: 30 days package" />
        </FormItem>
        <FormItem
          name="workerCategoryId"
          label="Worker Category"
          required={true}
        >
          <Select placeholder="Select Category">
            <Select.Option value="1">Domestic Worker</Select.Option>
          </Select>
        </FormItem>
        <FormItem name="isActive" label="Is Active" valuePropName="checked">
          <Switch
            checkedChildren="Active"
            unCheckedChildren="Inactive"
            defaultChecked
          />
        </FormItem>
        <FormItem name="details" label="Details">
          <Input.TextArea placeholder="Details" />
        </FormItem>
      </div>
    </Col>
  );
}
