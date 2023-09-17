import { Col, InputNumber, Row, Select } from "antd";
import { FormItem } from "../../../lib/form";

export default function ServiceRevenueModel() {
  return (
    <Col span={24} xl={8}>
      <div className="box-light">
        <h3 className="box-title">Service Revenue Model</h3>
        <Row gutter={[16, 16]}>
          <Col span={24} md={12}>
            <div className="inner-box">
              <h4 className="inner-box-title">Worker Commission </h4>
              <FormItem
                name="workerCommissionType"
                label="Type"
                required={true}
              >
                <Select placeholder="Select Type">
                  <Select.Option value="percentage">Percentage</Select.Option>
                  <Select.Option value="fixed">Fixed</Select.Option>
                </Select>
              </FormItem>
              <FormItem
                name="workerCommissionAmount"
                label="Amount"
                required={true}
              >
                <InputNumber />
              </FormItem>
            </div>
          </Col>
          <Col span={24} md={12}>
            <div className="inner-box">
              <h4 className="inner-box-title">Service Charge </h4>
              <FormItem name="serviceChargeType" label="Type" required={true}>
                <Select placeholder="Select Type">
                  <Select.Option value="percentage">Percentage</Select.Option>
                  <Select.Option value="fixed">Fixed</Select.Option>
                </Select>
              </FormItem>
              <FormItem
                name="serviceChargeAmount"
                label="Amount"
                required={true}
              >
                <InputNumber />
              </FormItem>
            </div>
          </Col>
        </Row>
      </div>
    </Col>
  );
}
