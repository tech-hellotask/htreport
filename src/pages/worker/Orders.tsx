import { useQuery } from "@tanstack/react-query";
import { Table, Tag } from "antd";
import {
  ListResponse,
  OrderListItemType,
  orderColors,
} from "../../utils/types";
import { ErrorAlert } from "../../lib/Alerts";
import { CustomError } from "../../utils/errors";
import { defaultPagination } from "../../utils/pagination";
import { dateSearchProps, useInputSearch } from "../../lib/searching.hooks";
import { useState } from "react";
import { localDateTime, objToQuery, urlToObj } from "../../utils/func";
import { SorterResult } from "antd/es/table/interface";
import OrderMenu from "../../components/menu/order";
import { useParams } from "react-router-dom";
import { fetchWorkerOrders } from "../../net/worker";

export default function WorkerOrders({ id }: { id?: string | number }) {
  const [params, setParams] = useState({
    limit: 100,
    offset: 0,
    start_date: "",
    end_date: "",
    order: "desc",
    status: "",
    id: "",
    type: "",
    ...urlToObj(window.location.search),
  });
  const { id: workerId } = useParams();
  if (!id) {
    id = Number(workerId);
  }
  const { isSuccess, data, isLoading, isError, error } = useQuery<
    ListResponse<OrderListItemType>,
    CustomError
  >({
    queryKey: [`/worker/${id}/orders?${objToQuery(params)}`],
    queryFn: fetchWorkerOrders,
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
              return <div>{localDateTime(created_at)}</div>;
            },
          },
          {
            title: "Working Time",
            key: "working_time",
            width: "180px",
            render: ({ start_time, end_time }) => {
              return (
                <div>
                  <div>{localDateTime(start_time)}</div>
                  <div>{localDateTime(end_time)}</div>
                </div>
              );
            },
          },
          {
            title: "Order ID",
            dataIndex: "id",
            key: "id",
            ...getColumnSearchProps("id"),
            render: (orderID: string) => {
              return <OrderMenu id={orderID} />;
            },
          },
          {
            title: "Type",
            dataIndex: "type",
            key: "type",
            filters: [
              {
                text: "Instant",
                value: "instant",
              },
              {
                text: "Package",
                value: "package",
              },
            ],
          },
          {
            title: "Work Status",
            dataIndex: "status",
            key: "status",
            ...getColumnSearchProps("status"),
            render: (status: string) => {
              return <Tag color={orderColors[status]}>{status}</Tag>;
            },
          },
          {
            title: "Order Status",
            dataIndex: "order_status",
            key: "order_status",
            ...getColumnSearchProps("order_status"),
          },
          {
            title: "$ Final Price",
            dataIndex: "final_price",
            key: "final_price",
          },
          {
            title: "Customer Payment Status",
            dataIndex: "payment_status",
            key: "payment_status",
            render: (payment_status: string) => {
              return (
                <Tag color={payment_status === "paid" ? "green" : "red"}>
                  {payment_status || "Unpaid"}
                </Tag>
              );
            },
          },
          {
            title: "Worker Payment",
            dataIndex: "is_paid",
            key: "is_paid",
            render: (is_paid: boolean) => {
              return (
                <Tag color={is_paid ? "green" : "red"}>
                  {is_paid ? "Paid" : "Unpaid"}
                </Tag>
              );
            },
          },
        ]}
        dataSource={isSuccess ? data.list : []}
        scroll={{ x: "1200px", y: "calc(100vh - 330px)" }}
        pagination={{
          ...defaultPagination,
          total: data?.count,
        }}
        onChange={(
          pagination,
          filters,
          sorter: SorterResult<OrderListItemType>
        ) => {
          setParams((prev) => {
            const temp = { ...prev };

            temp.limit = pagination.pageSize;
            temp.offset = (pagination.current - 1) * pagination.pageSize;

            temp.id = filters.id?.[0] as string;
            temp.type = filters.type?.[0] as string;
            temp.status = filters.status?.[0] as string;
            temp.order = sorter.order === "ascend" ? "asc" : "desc";
            temp.start_date = filters.created_at?.[0] as string;
            temp.end_date = filters.created_at?.[1] as string;

            // push to history
            window.history.pushState({}, "", `/order/list?${objToQuery(temp)}`);
            return temp;
          });
        }}
      />
    </div>
  );
}
