import { Col, InputNumber, Select } from "antd";
import { FormItem } from "../../../lib/form";

export default function ServiceRequirementOption() {
  return (
    <Col span={24} md={12} xl={8}>
      <div className="box-light">
        <h3 className="box-title">Service Pricing</h3>
        <FormItem name="pricingType" label="Pricing Type" required={true}>
          <Select placeholder="Select Pricing Type">
            <Select.Option value="fixed">Fixed</Select.Option>
            <Select.Option value="hourly">Hourly</Select.Option>
          </Select>
        </FormItem>
        <FormItem name="price" label="Price" required={true}>
          <InputNumber />
        </FormItem>
        <FormItem name="currency" label="Currency" required={true}>
          <Select placeholder="Select Currency">
            <Select.Option value="usd">USD</Select.Option>
            <Select.Option value="bdt">BDT</Select.Option>
          </Select>
        </FormItem>
      </div>
    </Col>
  );
}
