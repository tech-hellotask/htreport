import { useQuery } from "@tanstack/react-query";
import { Table } from "antd";
import { fetchOrders } from "../../net/order";
import { OrderType } from "../../utils/types";
import { ErrorAlert } from "../../lib/Alerts";
import { CustomError } from "../../utils/errors";

const columns = [
  {
    title: "Order ID",
    dataIndex: "pid",
    key: "pid",
    render: (pid: string, { created_at }: { created_at: string }) => (
      <div>
        <div>{pid}</div>
        <div>{new Date(created_at).toLocaleString()}</div>
      </div>
    ),
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
    title: "Worker ID",
    dataIndex: "worker_pid",
    key: "worker_pid",
  },
  {
    title: "Worker Name",
    dataIndex: "worker_name",
    key: "worker_name",
  },
  {
    title: "Worker Phone",
    dataIndex: "worker_phone",
    key: "worker_phone",
  },
  {
    title: "Total Charge",
    dataIndex: "total_charge",
    key: "total_charge",
  },
  {
    title: "Discount",
    dataIndex: "discount",
    key: "discount",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "Payment Status",
    dataIndex: "payment_status",
    key: "payment_status",
  },
  {
    title: "Area ID",
    dataIndex: "area_id",
    key: "area_id",
  },
  {
    title: "Worker Type",
    dataIndex: "worker_type",
    key: "worker_type",
  },
];

export default function PaymentOrders() {
  const { isSuccess, data, isLoading, isError, error } = useQuery<
    OrderType[],
    CustomError
  >({
    queryKey: ["/orders/list"],
    queryFn: fetchOrders,
  });

  return (
    <div>
      <ErrorAlert isError={isError} error={error} />
      <Table
        loading={isLoading}
        columns={columns}
        dataSource={isSuccess ? data : []}
        scroll={{ x: 1000, y: "calc(100vh - 240px)" }}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "50"],
          position: ["bottomRight"],
        }}
      />
    </div>
  );
}
