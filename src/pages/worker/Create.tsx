import WorkerCategoryForm from "../../components/worker/CategoryForm";
import WorkerDocumentForm from "../../components/worker/DocumentForm";
import WorkerForm from "../../components/worker/Form";
import WorkerPaymentMethod from "../../components/worker/PaymentMenthod";
import WorkerUtilsForm from "../../components/worker/UtilsForm";
import { Row, Col } from "antd";

export default function CreateWorker() {
  return (
    <div>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <WorkerForm />
        </Col>
        <Col>
          <WorkerPaymentMethod />
        </Col>
        <Col>
          <WorkerDocumentForm />
        </Col>
        <Col>
          <WorkerUtilsForm />
        </Col>
        <Col>
          <WorkerCategoryForm />
        </Col>
      </Row>
    </div>
  );
}
