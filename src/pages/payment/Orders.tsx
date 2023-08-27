import { useQuery } from "@tanstack/react-query";
import { Table, Tag } from "antd";
import { fetchOrders } from "../../net/order";
import { OrderListItemType } from "../../utils/types";
import { ErrorAlert } from "../../lib/Alerts";
import { CustomError } from "../../utils/errors";
import { defaultPagination } from "../../utils/pagination";
import { dateSearchProps, useInputSearch } from "../../lib/searching.hooks";
import { useState } from "react";
import { objToQuery } from "../../utils/func";
import { SorterResult } from "antd/es/table/interface";

const colors = {
  Canceled: "red",
  Completed: "green",
  Rejected: "red",
};

export default function PaymentOrders() {
  const [params, setParams] = useState({
    limit: 100,
    offset: 0,
    start_date: "",
    end_date: "",
    order: "",
    status: "",
    payment_status: "",
    id: "",
  });
  const { isSuccess, data, isLoading, isError, error } = useQuery<
    OrderListItemType[],
    CustomError
  >({
    queryKey: [`/order/list?${objToQuery(params)}`],
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
            title: "Status",
            dataIndex: "status",
            key: "status",
            ...getColumnSearchProps("status"),
            render: (status: string) => {
              return <Tag color={colors[status]}>{status}</Tag>;
            },
          },
          {
            title: "Payment Status",
            dataIndex: "payment_status",
            key: "payment_status",
            ...getColumnSearchProps("payment_status"),
          },
          {
            title: "$ Regular Price",
            dataIndex: "regular_price",
            key: "regular_price",
          },
          {
            title: "$ Discount",
            dataIndex: "discount",
            key: "discount",
          },
          {
            title: "$ Service Charge",
            dataIndex: "service_charge",
            key: "service_charge",
          },
          {
            title: "$ Vat",
            dataIndex: "vat",
            key: "vat",
          },
          {
            title: "$ Final Price",
            dataIndex: "final_price",
            key: "final_price",
          },
          {
            title: "$ Refund",
            dataIndex: "refund",
            key: "refund",
          },
        ]}
        dataSource={isSuccess ? data : []}
        scroll={{ x: "1200px", y: "calc(100vh - 240px)" }}
        pagination={{
          ...defaultPagination,
          total: isSuccess ? params.limit + params.offset + 1 : 0,
        }}
        onChange={(
          pagination,
          filters,
          sorter: SorterResult<OrderListItemType>
        ) => {
          console.log(pagination, filters, sorter);
          setParams((prev) => {
            const temp = { ...prev };

            temp.limit = pagination.pageSize;
            temp.offset = (pagination.current - 1) * pagination.pageSize;

            if (filters.status?.length) {
              temp.status = (filters.status[0] as string) || "";
            } else {
              temp.status = "";
            }

            if (filters.payment_status?.length) {
              temp.payment_status = (filters.payment_status[0] as string) || "";
            } else {
              temp.payment_status = "";
            }

            if (sorter.order) {
              temp.order = sorter.order === "ascend" ? "asc" : "desc";
            } else {
              temp.order = "";
            }

            if (filters.created_at?.length == 2) {
              temp.start_date = (filters.created_at[0] as string) || "";
              temp.end_date = (filters.created_at[1] as string) || "";
            } else {
              temp.start_date = "";
              temp.end_date = "";
            }

            return temp;
          });
        }}
      />
    </div>
  );
}
