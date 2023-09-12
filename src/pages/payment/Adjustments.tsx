import { Table } from "antd";
import CreateAdjustment from "../../components/payment/adjustment/create";
import { ErrorAlert } from "../../lib/Alerts";
import { defaultPagination } from "../../utils/pagination";
import { AdjustmentType, ListResponse } from "./../../utils/types";
import { fetchAdjustments } from "../../net/payment";
import { useQuery } from "@tanstack/react-query";
import { CustomError } from "../../utils/errors";
import { dateSearchProps, useInputSearch } from "../../lib/searching.hooks";
import { useState } from "react";
import { localDateTime, objToQuery } from "../../utils/func";
import { SorterResult } from "antd/es/table/interface";
import WorkerMenu from "../../components/menu/worker";

export default function PaymentAdjustment() {
  const { getColumnSearchProps } = useInputSearch();
  const [params, setParams] = useState({
    limit: 100,
    offset: 0,
    phone: "",
    name: "",
    remarks: "",
    amount: 0,
    worker_id: 0,
    start_date: "",
    end_date: "",
    order: "desc",
    order_by: "created_at",
  });
  const { isSuccess, data, isLoading, isError, error } = useQuery<
    ListResponse<AdjustmentType>,
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
      ...dateSearchProps(),
      render: (created_at: string) => localDateTime(created_at),
    },
    {
      title: "Worker Name",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
      render: (name: string, { worker_id }: AdjustmentType) => (
        <WorkerMenu id={worker_id} name={name} children={name} center={false} />
      ),
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
      ...getColumnSearchProps("amount"),
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
        dataSource={isSuccess ? data.list : []}
        scroll={{ x: 1000, y: "calc(100vh - 240px)" }}
        pagination={{ ...defaultPagination, total: data?.count }}
        onChange={(
          pagination,
          filters,
          sorter: SorterResult<AdjustmentType>
        ) => {
          setParams((params) => {
            const temp = { ...params };
            temp.limit = pagination.pageSize;
            temp.offset = (pagination.current - 1) * pagination.pageSize;
            temp.worker_id = filters.worker_id
              ? parseInt(filters.worker_id?.toString())
              : 0;
            temp.name = filters.name?.toString();
            temp.phone = filters.phone?.toString();
            temp.remarks = filters.remarks?.toString();
            temp.amount = filters.amount
              ? parseInt(filters.amount.toString())
              : 0;

            if (filters.created_at?.length == 2) {
              temp.start_date = filters.created_at[0] as string;
              temp.end_date = filters.created_at[1] as string;
            }

            if (sorter.order) {
              temp.order = sorter.order == "ascend" ? "asc" : "desc";
              temp.order_by = sorter.field as string;
            }

            return temp;
          });
        }}
      />
    </div>
  );
}
