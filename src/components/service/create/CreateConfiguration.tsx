import { Col, InputNumber, Row } from "antd";
import { FormItem } from "../../../lib/form";

// {
//   "service_charge_amount": 0,
//   "service_charge_type": "string",
//   "worker_commission_amount": 0,
//   "worker_commission_type": "string"
// }

export default function ServiceConfiguration() {
  return (
    <Col span={24} md={12} xl={8}>
      <div className="box-light">
        <h3 className="box-title">Service Configuration</h3>
        <Row gutter={[16, 16]}>
          <FormItem name="work_days" label="Total Days" required={true} col={2}>
            <InputNumber style={{ width: "100%" }} />
          </FormItem>
          <FormItem
            col={2}
            name="total_holidays"
            label="Total Holidays"
            required={true}
          >
            <InputNumber style={{ width: "100%" }} />
          </FormItem>
          <FormItem
            col={2}
            name="hour_per_work"
            label="Hour Per Work"
            required={true}
          >
            <InputNumber style={{ width: "100%" }} />
          </FormItem>
          <FormItem
            col={2}
            name="hourly_rate"
            label="Hourly Rate"
            required={true}
          >
            <InputNumber style={{ width: "100%" }} />
          </FormItem>
        </Row>
      </div>
    </Col>
  );
}
