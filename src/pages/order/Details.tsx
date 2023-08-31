import { Card, Avatar, Descriptions, Col, Row } from "antd";
import styled from "styled-components";
import { OrderDetailsPaymentType, OrderDetailsType } from "../../utils/types";
import type { DescriptionsProps } from "antd";
import { localDateTime } from "../../utils/func";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { CustomError } from "../../utils/errors";
import { ErrorAlert } from "../../lib/Alerts";
import { fetchOrder } from "../../net/order";

const WorkerCard = ({ worker }) => {
  const items: DescriptionsProps["items"] = [
    {
      key: "4",
      label: "Commission Type",
      children: worker.commission_type,
    },
    {
      key: "5",
      label: "Commission Amount",
      children: worker.commission_amount,
    },
    {
      key: "6",
      label: "Commission",
      children: worker.commission,
    },
    {
      key: "7",
      label: "Due",
      children: worker.due,
    },
    {
      key: "8",
      label: "Status",
      children: worker.status,
    },
  ];

  return (
    <Card
      bordered={false}
      style={{
        boxShadow: "0px 1px 2px rgba(0,0,0,.3)",
        margin: 0,
        marginTop: "10px",
      }}
    >
      <Card.Meta
        avatar={<Avatar src={worker.worker.image} />}
        title={`${worker.worker.name} (${worker.worker.id})`}
        description={`Phone: ${worker.worker.phone}`}
      />
      <Descriptions style={{ marginTop: "30px" }} items={items} />
    </Card>
  );
};

const OrderDetailsCard = ({ order }) => {
  const items: DescriptionsProps["items"] = [
    {
      key: "2",
      label: "Type",
      children: order.type,
    },
    {
      key: "3",
      label: "Status",
      children: order.status,
    },
    {
      key: "11",
      label: "Work Hour",
      children: order.work_hour,
    },
    {
      key: "12",
      label: "Rate",
      children: order.rate,
    },
    {
      key: "7",
      label: "Service Charge",
      children: order.service_charge.toString() + " TK",
    },
    {
      key: "5",
      label: "Regular Price",
      children: order.regular_price.toString() + " TK",
    },
    {
      key: "6",
      label: "Discount",
      children: order.discount.toString() + " TK",
    },
    {
      key: "8",
      label: "Vat",
      children: order.vat.toString() + " TK",
    },
    {
      key: "9",
      label: "$ Final Price",
      children: order.final_price.toString() + " TK",
    },
    {
      key: "10",
      label: "Created At",
      children: localDateTime(order.created_at),
    },
  ];

  return (
    <div className="box-light mb-20">
      <Descriptions title={`Order #${order.id}`} items={items} />
    </div>
  );
};

const CustomerPayment = ({ payment }: { payment: OrderDetailsPaymentType }) => {
  const items: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "TX ID",
      children: payment.tx_id,
      span: 3,
    },
    {
      key: "2",
      label: "Payment Method",
      children: payment.method,
      span: 3,
    },
    {
      key: "3",
      label: "Payment Status",
      children: payment.status,
      span: 3,
    },
    {
      key: "4",
      label: "Payment Amount",
      children: payment.amount,
      span: 3,
    },
    {
      key: "5",
      label: "Remarks",
      children: payment.remarks,
      span: 3,
    },
    {
      key: "6",
      label: "MetaInfo",
      children: <pre>{JSON.stringify(payment.meta_info ?? "", null, 2)}</pre>,
      span: 3,
      style: {
        overflow: "auto",
        width: "100%",
      },
    },
  ];
  return (
    <div className="box-light">
      <Descriptions title="Payment" items={items} />
    </div>
  );
};

const CustomerInfo = ({ order }: { order: OrderDetailsType }) => {
  const items: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "ID",
      children: order.customer_id,
      span: 3,
    },
    {
      key: "2",
      label: "Name",
      children: order.customer_name,
      span: 3,
    },
    {
      key: "3",
      label: "Phone",
      children: order.customer_phone,
      span: 3,
    },
    {
      key: "4",
      label: "Email",
      children: order.customer_email,
      span: 3,
    },
  ];
  return (
    <div className="box-light">
      <Descriptions title="Customer Info" items={items} />
    </div>
  );
};

export default function OrderDetails({ id: defaultId }: { id?: number }) {
  const { id = defaultId } = useParams();
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
        <Col span={24} lg={14}>
          <OrderDetailsCard order={query.data} />
          <div>Assigned Workers</div>
          {query.data.workers.map((worker) => (
            <WorkerCard key={worker.id} worker={worker} />
          ))}
        </Col>
        <Col span={24} lg={10}>
          <CustomerInfo order={query.data} />
          <br />
          <CustomerPayment payment={query.data.payment} />
        </Col>
      </Row>
    </Wrapper>
  );
}

const Wrapper = styled.div``;
