import { useQuery } from "@tanstack/react-query";
import { Table, Tag } from "antd";
import { fetchOrders } from "../../net/order";
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
    customer_id: "",
    type: "",
    ...urlToObj(window.location.search),
  });
  const { isSuccess, data, isLoading, isError, error } = useQuery<
    ListResponse<OrderListItemType>,
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
              return <div>{localDateTime(created_at)}</div>;
            },
          },
          {
            title: "Order ID",
            dataIndex: "id",
            key: "id",
            ...getColumnSearchProps("id"),
            render: (id: string) => {
              return <OrderMenu id={id} />;
            },
          },
          {
            title: "Customer ID",
            dataIndex: "customer_id",
            key: "customer_id",
            ...getColumnSearchProps("customer_id"),
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
            title: "Status",
            dataIndex: "status",
            key: "status",
            ...getColumnSearchProps("status"),
            render: (status: string) => {
              return <Tag color={orderColors[status]}>{status}</Tag>;
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
        dataSource={isSuccess ? data.list : []}
        scroll={{ x: "1200px", y: "calc(100vh - 240px)" }}
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
            temp.customer_id = filters.customer_id?.[0] as string;
            temp.type = filters.type?.[0] as string;
            temp.status = filters.status?.[0] as string;
            temp.payment_status = filters.payment_status?.[0] as string;
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
