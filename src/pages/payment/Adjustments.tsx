import { Table } from "antd";
import CreateAdjustment from "../../components/payment/adjustment/create";
import { ErrorAlert } from "../../lib/Alerts";
import { defaultPagination } from "../../utils/pagination";
import { AdjustmentType } from "./../../utils/types";
import { fetchAdjustments } from "../../net/payment";
import { useQuery } from "@tanstack/react-query";
import { CustomError } from "../../utils/errors";

const columns = [
  {
    title: "Worker ID",
    dataIndex: "worker_pid",
    key: "worker_pid",
  },
  {
    title: "Worker Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Worker Phone",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
  },
  {
    title: "Remarks",
    dataIndex: "remarks",
    key: "remarks",
  },
  {
    title: "Added By",
    dataIndex: "added_by",
    key: "added_by",
  },
];

export default function PaymentAdjustment() {
  const { isSuccess, data, isLoading, isError, error } = useQuery<
    AdjustmentType[],
    CustomError
  >({
    queryKey: ["/adjustment/list"],
    queryFn: fetchAdjustments,
  });

  return (
    <div>
      <div className="flex-between">
        <CreateAdjustment />
        <ErrorAlert isError={isError} error={error} />
      </div>
      <Table
        loading={isLoading}
        columns={columns}
        dataSource={isSuccess ? data : []}
        scroll={{ x: 1000, y: "calc(100vh - 240px)" }}
        pagination={defaultPagination}
      />
    </div>
  );
}
