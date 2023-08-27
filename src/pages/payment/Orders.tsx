import { useQuery } from "@tanstack/react-query";
import { Table, Tag } from "antd";
import { fetchOrders } from "../../net/order";
import { OrderListItemType } from "../../utils/types";
import { ErrorAlert } from "../../lib/Alerts";
import { CustomError } from "../../utils/errors";
import { defaultPagination } from "../../utils/pagination";
import { dateSearchProps, useInputSearch } from "../../lib/searching.hooks";

const colors = {
  Canceled: "red",
  Completed: "green",
  Rejected: "red",
};

export default function PaymentOrders() {
  const { isSuccess, data, isLoading, isError, error } = useQuery<
    OrderListItemType[],
    CustomError
  >({
    queryKey: ["/orders/list"],
    queryFn: fetchOrders,
  });
  const { getColumnSearchProps } = useInputSearch();

  return (
    <div>
      <ErrorAlert isError={isError} error={error} />
      <Table
        loading={isLoading}
        columns={[
          {
            title: "Date & Time",
            dataIndex: "created_at",
            key: "created_at",
            width: "200px",
            ...dateSearchProps(),
            render: (created_at: string) => {
              return <div>{new Date(created_at).toLocaleString()}</div>;
            },
          },
          {
            title: "Order ID",
            dataIndex: "id",
            key: "id",
            ...getColumnSearchProps("id"),
          },
          {
            title: "Type",
            dataIndex: "type",
            key: "type",
          },
          {
            title: "Customer ID",
            dataIndex: "customer_id",
            key: "customer_id",
          },

          {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status: string) => {
              return <Tag color={colors[status]}>{status}</Tag>;
            },
          },
          {
            title: "Payment Status",
            dataIndex: "payment_status",
            key: "payment_status",
          },
          {
            title: "Regular Price",
            dataIndex: "regular_price",
            key: "regular_price",
          },
          {
            title: "Discount",
            dataIndex: "discount",
            key: "discount",
          },
          {
            title: "Service Charge",
            dataIndex: "service_charge",
            key: "service_charge",
          },
          {
            title: "Vat",
            dataIndex: "vat",
            key: "vat",
          },
          {
            title: "Refund",
            dataIndex: "refund",
            key: "refund",
          },
        ]}
        dataSource={isSuccess ? data : []}
        scroll={{ x: 1000, y: "calc(100vh - 240px)" }}
        pagination={defaultPagination}
      />
    </div>
  );
}
