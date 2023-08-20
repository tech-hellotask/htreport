import { Table } from "antd";
import CreateAdjustment from "../../components/payment/adjustment/create";
import { ErrorAlert } from "../../lib/Alerts";
import { defaultPagination } from "../../utils/pagination";
import { AdjustmentType } from "./../../utils/types";
import { fetchAdjustments } from "../../net/payment";
import { useQuery } from "@tanstack/react-query";
import { CustomError } from "../../utils/errors";
import { useInputSearch } from "../../lib/searching.hooks";
import { useState } from "react";
import { objToQuery } from "../../utils/func";

export default function PaymentAdjustment() {
  const { getColumnSearchProps } = useInputSearch();
  const [params, setParams] = useState({
    limit: 100,
    offset: 0,
    phone: "",
    name: "",
    remarks: "",
    worker_id: 0,
    worker_pid: 0,
    start_date: "",
    end_date: 0,
  });
  const { isSuccess, data, isLoading, isError, error } = useQuery<
    AdjustmentType[],
    CustomError
  >({
    queryKey: [`/adjustment/list?${objToQuery(params)}`],
    queryFn: fetchAdjustments,
  });

  const columns = [
    {
      title: "Date & Time",
      dataIndex: "created_at",
      key: "created_at",
      render: (created_at: string) => new Date(created_at).toLocaleString(),
    },
    {
      title: "Worker Name",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Worker Phone",
      dataIndex: "phone",
      key: "phone",
      ...getColumnSearchProps("phone"),
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
      ...getColumnSearchProps("remarks"),
    },
    {
      title: "Added By",
      dataIndex: "added_by",
      key: "added_by",
    },
  ];

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
        onChange={(pagination, filters) => {
          setParams((params) => {
            const temp = { ...params };
            temp.limit = pagination.pageSize;
            temp.offset = (pagination.current - 1) * pagination.pageSize;
            (temp.worker_id = filters.worker_id
              ? parseInt(filters.worker_id?.toString())
              : 0),
              (temp.worker_pid = filters.worker_pid
                ? parseInt(filters.worker_pid?.toString())
                : 0),
              (temp.name = filters.name?.toString());
            temp.phone = filters.phone?.toString();
            temp.remarks = filters.remarks?.toString();

            return temp;
          });
        }}
      />
    </div>
  );
}
