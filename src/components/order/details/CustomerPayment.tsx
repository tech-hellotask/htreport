import { Descriptions, DescriptionsProps } from "antd";
import { OrderDetailsPaymentType } from "../../../utils/types";
import { localDateTime } from "../../../utils/func";

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
      key: "7",
      label: "Created At",
      children: localDateTime(payment.created_at),
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

export default CustomerPayment;
