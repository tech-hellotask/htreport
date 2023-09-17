import { Form, Row } from "antd";
import BasicInfo from "../../components/service/create/CreateBasicInfo";
import ServiceConfiguration from "../../components/service/create/CreateConfiguration";
import ServiceDiscount from "../../components/service/create/CreateDiscount";
import ServiceRevenueModel from "../../components/service/create/CreateRevenueModel";
import ServiceRequirement from "../../components/service/create/CreateRequirement";
import ServiceRequirementOption from "../../components/service/create/CreateRequirementOption";

export default function CreateService() {
  const [form] = Form.useForm();
  return (
    <Form form={form} layout="vertical">
      <Row gutter={[24, 24]}>
        <BasicInfo />
        <ServiceConfiguration />
        <ServiceRevenueModel />
        <ServiceDiscount />
        <ServiceRequirement />
        <ServiceRequirementOption />
      </Row>
    </Form>
  );
}
