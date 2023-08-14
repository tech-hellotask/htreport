import { Table } from "antd";
import { ErrorAlert } from "../../lib/Alerts";
import { fetchTransactions } from "../../net/payment";
import { useQuery } from "@tanstack/react-query";
import { TransactionType } from "../../utils/types";
import { defaultPagination } from "../../utils/pagination";
import { CustomError } from "../../utils/errors";

const columns = [
  {
    title: "Worker ID",
    dataIndex: "worker_id",
    key: "worker_id",
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
    title: "Account No",
    dataIndex: "account_no",
    key: "account_no",
  },
  {
    title: "Payment Method",
    dataIndex: "payment_method",
    key: "payment_method",
  },
  {
    title: "Tx ID",
    dataIndex: "tx_id",
    key: "tx_id",
  },
  {
    title: "Note",
    dataIndex: "note",
    key: "note",
  },
  {
    title: "Paid By",
    dataIndex: "paid_by",
    key: "paid_by",
  },
  {
    title: "Created At",
    dataIndex: "created_at",
    key: "created_at",
  },
];

export default function PaymentTransactions() {
  const { isSuccess, data, isLoading, isError, error } = useQuery<
    TransactionType[],
    CustomError
  >({
    queryKey: ["/transaction/list"],
    queryFn: fetchTransactions,
  });

  return (
    <div>
      <ErrorAlert isError={isError} error={error} />
      <Table
        loading={isLoading}
        columns={columns}
        dataSource={isSuccess ? data : []}
        pagination={defaultPagination}
        scroll={{ x: 1000, y: "calc(100vh - 240px)" }}
      />
    </div>
  );
}
