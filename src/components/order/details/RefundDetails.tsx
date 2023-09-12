import { Descriptions, DescriptionsProps } from "antd";
import { localDateTime } from "../../../utils/func";
import { OrderDetailsRefundType } from "../../../utils/types";

const RefundDetails = ({ refund }: { refund: OrderDetailsRefundType }) => {
  if (!refund || refund.id === 0) {
    return null;
  }

  const items: DescriptionsProps["items"] = [
    {
      key: "2",
      label: "Status",
      children: `${refund.status}`,
      span: 3,
    },
    {
      key: "3",
      label: "Amount",
      children: refund.amount,
      span: 3,
    },
    {
      key: "11",
      label: "Payment Method",
      children: refund.payment_method,
      span: 3,
    },
    {
      key: "15",
      label: "Account No",
      children: refund.account_no,
      span: 3,
    },
    {
      key: "12",
      label: "Account Details",
      children: refund.account_details,
      span: 3,
    },
    {
      key: "13",
      label: "Transaction ID",
      children: refund.tx_id,
      span: 3,
    },
    {
      key: "7",
      label: "Remarks",
      children: refund.remarks,
      span: 3,
    },
    {
      key: "5",
      label: "Refund By",
      children: refund.refund_by,
      span: 3,
    },
    {
      key: "6",
      label: "Created At",
      children: localDateTime(refund.created_at),
      span: 3,
    },
    {
      key: "9",
      label: "Updated At",
      children: localDateTime(refund.updated_at),
      span: 3,
    },
  ];

  return (
    <div className="box-light">
      <Descriptions title={`Refund Details`} items={items} />
    </div>
  );
};

export default RefundDetails;
