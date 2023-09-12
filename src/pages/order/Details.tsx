import { Col, Row } from "antd";
import styled from "styled-components";
import { OrderDetailsType } from "../../utils/types";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { CustomError } from "../../utils/errors";
import { ErrorAlert } from "../../lib/Alerts";
import { fetchOrder } from "../../net/order";
import WorkerCard from "../../components/order/details/WorkerCard";
import OrderDetailsCard from "../../components/order/details/OrderDetailsCard";
import CustomerPayment from "../../components/order/details/CustomerPayment";
import CustomerInfo from "../../components/order/details/CustomerInfo";
import RefundDetails from "../../components/order/details/RefundDetails";

export default function OrderDetails({ id }: { id?: number }) {
  const { id: orderId } = useParams();
  if (!id) {
    id = Number(orderId);
  }
  const query = useQuery<OrderDetailsType, CustomError>({
    queryKey: [`/order/${id}`],
    queryFn: fetchOrder,
    retry: false,
  });

  if (query.isLoading) {
    return <div>loading...</div>;
  }

  if (query.isError) {
    return <ErrorAlert error={query.error} isError={query.isError} />;
  }

  return (
    <Wrapper>
      <Row gutter={[16, 16]}>
        <Col span={24} lg={14} className="scrollable custom-scroll">
          <OrderDetailsCard order={query.data} />
          <div>Assigned Workers</div>
          {query.data.workers.map((worker) => (
            <WorkerCard key={worker.id} worker={worker} />
          ))}
        </Col>
        <Col span={24} lg={10} className="scrollable custom-scroll">
          <CustomerInfo order={query.data} />
          <br />
          <RefundDetails refund={query.data.refund} />
          <br />
          <CustomerPayment payment={query.data.payment} />
        </Col>
      </Row>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  .scrollable {
    height: calc(100vh - 100px);
  }

  .ant-card {
    border: 1px solid #c1baba;
  }
`;
