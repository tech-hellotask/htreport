import { Table } from "antd";
import { ErrorAlert } from "../../lib/Alerts";
import { fetchTransactions } from "../../net/payment";
import { useQuery } from "@tanstack/react-query";
import { TransactionType } from "../../utils/types";
import { defaultPagination } from "../../utils/pagination";
import { CustomError } from "../../utils/errors";
import { dateSearchProps, useInputSearch } from "../../lib/searching.hooks";
import { localDateTime } from "../../utils/func";

export default function PaymentTransactions() {
  const { isSuccess, data, isLoading, isError, error } = useQuery<
    TransactionType[],
    CustomError
  >({
    queryKey: ["/transaction/list"],
    queryFn: fetchTransactions,
  });
  const { getColumnSearchProps } = useInputSearch();

  const columns = [
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      width: "200px",
      ...dateSearchProps(),
      render: (created_at: string) => {
        return <div>{localDateTime(created_at)}</div>;
      },
    },
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      ...getColumnSearchProps("id"),
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
      title: "Paid",
      dataIndex: "amount",
      key: "amount",
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
  ];

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
