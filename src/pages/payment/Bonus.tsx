import { Table } from "antd";
import { fetchBonus } from "../../net/payment";
import { BonusType } from "../../utils/types";
import { defaultPagination } from "../../utils/pagination";
import { ErrorAlert } from "../../lib/Alerts";
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
    dataIndex: "worker_name",
    key: "worker_name",
  },
  {
    title: "Worker Phone",
    dataIndex: "worker_phone",
    key: "worker_phone",
  },
  {
    title: "Amount",
    dataIndex: "bonus_amount",
    key: "bonus_amount",
  },
  {
    title: "Added By",
    dataIndex: "added_by",
    key: "added_by",
  },
];

export default function Bonus() {
  const { isSuccess, data, isLoading, isError, error } = useQuery<
    BonusType[],
    CustomError
  >({
    queryKey: ["/bonus/list"],
    queryFn: fetchBonus,
  });

  return (
    <div>
      <ErrorAlert isError={isError} error={error} />
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
