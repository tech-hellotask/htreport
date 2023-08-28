import { Table, Tag } from "antd";
import { useState } from "react";
import { PaymentLogType } from "../../utils/types";
import { CustomError } from "../../utils/errors";
import { useQuery } from "@tanstack/react-query";
import { ErrorAlert } from "../../lib/Alerts";
import { useInputSearch, dateSearchProps } from "../../lib/searching.hooks";
import { defaultPagination } from "../../utils/pagination";
import { localDateTime, objToQuery } from "../../utils/func";
import { fetchPaymentLogs } from "../../net/payment";

const colors = {
  init: "red",
  completed: "green",
  closed: "gray",
};

export default function PaymentLogs() {
  const [params, setParams] = useState({
    limit: 100,
    offset: 0,
    start_date: "",
    end_date: "",
    account_type: "",
  });

  const { isSuccess, data, isLoading, isError, error } = useQuery<
    {
      list: PaymentLogType[];
      count: number;
    },
    CustomError
  >({
    queryKey: [`/payment/logs?${objToQuery(params)}`],
    queryFn: fetchPaymentLogs,
    retry: false,
  });
  const { getColumnSearchProps } = useInputSearch();

  const columns = [
    {
      title: "Date & Time",
      dataIndex: "created_at",
      key: "created_at",
      ...dateSearchProps(),
      render: (date: string) => localDateTime(date),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      ...getColumnSearchProps("status"),
      render: (status: string) => (
        <Tag style={{ textTransform: "capitalize" }} color={colors[status]}>
          {status}
        </Tag>
      ),
    },
    {
      title: "User",
      dataIndex: "user_name",
      key: "user_name",
    },
    {
      title: "Account Type",
      dataIndex: "account_type",
      key: "account_type",
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
        pagination={{
          ...defaultPagination,
          total: isSuccess ? params.limit + params.offset + 1 : 0,
        }}
        onChange={(pagination, filters) => {
          const temp = { ...params };
          temp.limit = pagination.pageSize;
          temp.offset = pagination.pageSize * (pagination.current - 1);

          if (filters.created_at?.length === 2) {
            temp.start_date = filters.created_at[0] as string;
            temp.end_date = filters.created_at[1] as string;
          } else {
            temp.start_date = "";
            temp.end_date = "";
          }

          if (filters.account_type?.length) {
            temp.account_type = filters.account_type[0] as string;
          } else {
            temp.account_type = "";
          }

          setParams(temp);
        }}
      />
    </div>
  );
}
