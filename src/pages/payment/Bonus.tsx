import { Table } from "antd";
import { fetchBonus } from "../../net/payment";
import { BonusType, ListResponse } from "../../utils/types";
import { defaultPagination } from "../../utils/pagination";
import { ErrorAlert } from "../../lib/Alerts";
import { useQuery } from "@tanstack/react-query";
import { CustomError } from "../../utils/errors";
import { dateSearchProps, useInputSearch } from "../../lib/searching.hooks";
import { localDateTime, objToQuery } from "../../utils/func";
import { useState } from "react";
import { SorterResult } from "antd/es/table/interface";
import WorkerMenu from "../../components/menu/worker";

export default function Bonus() {
  const [params, setParams] = useState({
    limit: 100,
    order: "desc",
    offset: 0,
    start_date: "",
    end_date: "",
    amount: 0,
    worker_id: 0,
  });
  const { getColumnSearchProps } = useInputSearch();

  const { isSuccess, data, isLoading, isError, error } = useQuery<
    ListResponse<BonusType>,
    CustomError
  >({
    queryKey: [`/bonus/list?${objToQuery(params)}`],
    queryFn: fetchBonus,
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
      title: "Worker ID",
      dataIndex: "worker_id",
      key: "worker_id",
      ...getColumnSearchProps("worker_id"),
      render: (id: number) => <WorkerMenu id={id} />,
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
      ...getColumnSearchProps("bonus_amount"),
    },
    {
      title: "Remarks",
      dataIndex: "remarks",
      key: "remarks",
    },
  ];

  return (
    <div>
      <ErrorAlert isError={isError} error={error} />
      <Table
        loading={isLoading}
        columns={columns}
        dataSource={isSuccess ? data.list : []}
        scroll={{ x: 1000, y: "calc(100vh - 240px)" }}
        pagination={{ ...defaultPagination, total: isSuccess ? data.count : 0 }}
        onChange={(pagination, filters, sorter: SorterResult<BonusType>) => {
          setParams((prev) => {
            const temp = { ...prev };
            temp.limit = pagination.pageSize as number;
            temp.offset = (((pagination.current as number) - 1) *
              pagination.pageSize) as number;

            if (filters.created_at?.length === 2) {
              temp.start_date = filters.created_at[0] as string;
              temp.end_date = filters.created_at[1] as string;
            } else {
              temp.start_date = "";
              temp.end_date = "";
            }

            if (filters.worker_id) {
              temp.worker_id = filters.worker_id[0] as number;
            } else {
              temp.worker_id = 0;
            }

            if (filters.bonus_amount) {
              temp.amount = filters.bonus_amount[0] as number;
            } else {
              temp.amount = 0;
            }

            if (sorter.order) {
              temp.order = sorter.order === "ascend" ? "asc" : "desc";
            } else {
              temp.order = "desc";
            }

            return temp;
          });
        }}
      />
    </div>
  );
}
