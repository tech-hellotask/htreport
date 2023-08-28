import { Card, Avatar, Descriptions } from "antd";
import styled from "styled-components";
import { OrderDetailsType } from "../../utils/types";
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
      key: "4",
      label: "Payment Status",
      children: order.payment_status,
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
      label: "$ Service Charge",
      children: order.service_charge,
    },
    {
      key: "5",
      label: "$ Regular Price",
      children: order.regular_price,
    },
    {
      key: "6",
      label: "$ Discount",
      children: order.discount,
    },
    {
      key: "8",
      label: "$ Vat",
      children: order.vat,
    },
    {
      key: "9",
      label: "$ Final Price",
      children: order.final_price,
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
      <OrderDetailsCard order={query.data} />
      <div>Assigned Workers</div>
      {query.data.workers.map((worker) => (
        <WorkerCard key={worker.id} worker={worker} />
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div``;
