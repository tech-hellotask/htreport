import { Descriptions, DescriptionsProps } from "antd";
import { localDateTime } from "../../../utils/func";
import { OrderDetailsType } from "../../../utils/types";

const OrderDetailsCard = ({ order }: { order: OrderDetailsType }) => {
  const items: DescriptionsProps["items"] = [
    {
      key: "2",
      label: "Service Type",
      children: `${order.service_name}`,
    },
    {
      key: "3",
      label: "Status",
      children: order.status,
    },
    {
      key: "11",
      label: "Work Hour",
      children: order.work_hour.toFixed(2) + " Hr",
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
      label: "$ Refund",
      children: order.refund.toString() + " TK",
    },
    {
      key: "11",
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

export default OrderDetailsCard;
