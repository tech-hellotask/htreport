import { Descriptions, DescriptionsProps } from "antd";
import { OrderDetailsType } from "../../../utils/types";

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

export default CustomerInfo;
