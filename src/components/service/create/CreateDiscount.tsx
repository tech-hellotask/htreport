import { Col, DatePicker, InputNumber, Select } from "antd";
import { FormItem } from "../../../lib/form";

export default function ServiceDiscount() {
  return (
    <Col span={24} md={12} xl={8}>
      <div className="box-light">
        <h3 className="box-title">Service Discount</h3>
        <FormItem name="discountType" label="Discount Type" required={true}>
          <Select placeholder="Select Discount Type">
            <Select.Option value="percentage">Percentage</Select.Option>
            <Select.Option value="fixed">Fixed</Select.Option>
          </Select>
        </FormItem>
        <FormItem name="discountAmount" label="Discount Amount" required={true}>
          <InputNumber />
        </FormItem>
        <FormItem
          name="discountValidity"
          label="Discount Validity"
          required={true}
        >
          <DatePicker.RangePicker />
        </FormItem>
      </div>
    </Col>
  );
}
