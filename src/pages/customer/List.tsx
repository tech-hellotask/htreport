import { useQuery } from "@tanstack/react-query";
import { getCustomers } from "../../net/customer";
import { Table, Tag } from "antd";
import { defaultPagination } from "../../utils/pagination";
import { CustomerListItemType, ListResponse } from "../../utils/types";
import { CustomError } from "../../utils/errors";
import { useState } from "react";
import { localDateTime, objToQuery } from "../../utils/func";
import { Link } from "react-router-dom";
import { dateSearchProps, useInputSearch } from "../../lib/searching.hooks";
import { ErrorAlert } from "../../lib/Alerts";

export default function CustomerList() {
  const [params, setParams] = useState({
    limit: 100,
    offset: 0,
    name: "",
    email: "",
    phone: "",
    ID: "",
    start_date: "",
    end_date: "",
  });
  const query = useQuery<ListResponse<CustomerListItemType>, CustomError>({
    queryKey: [`/customer/list?${objToQuery(params)}`],
    queryFn: getCustomers,
  });
  const { getColumnSearchProps } = useInputSearch();

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      ...getColumnSearchProps("id"),
      render: (id: number) => <Link to={`/customer/${id}`}>{id}</Link>,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 230,
      ...getColumnSearchProps("email"),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      ...getColumnSearchProps("phone"),
    },
    // {
    //   title: "Badge",
    //   dataIndex: "badge",
    //   key: "badge",
    //   ...getColumnSearchProps("badge"),
    //   render: (badge: string) => <Tag>{badge}</Tag>,
    // },
    {
      title: "Orders",
      dataIndex: "id",
      key: "orders",
      render: (id: number) => (
        <Link to={`/order/list?customer_id=${id}`}>Orders</Link>
      ),
    },
    {
      title: "Total Order Value",
      dataIndex: "order_value",
      key: "order_value",
      render: (order_value: number) => (
        <Tag color="black">{order_value.toFixed()} BDT</Tag>
      ),
    },
    {
      title: "Total Paid",
      dataIndex: "paid",
      key: "paid",
      render: (paid: number) => <Tag color="blue">{paid.toFixed()} BDT</Tag>,
    },
    {
      title: "Due",
      dataIndex: "due",
      key: "due",
      render: (due: number) => (
        <Tag color={due >= 1 ? "red" : "green"}>{due.toFixed(2)} BDT</Tag>
      ),
    },
    {
      title: "Joined At",
      dataIndex: "created_at",
      key: "created_at",
      ...dateSearchProps(),
      sorter: false,
      render: (created_at: string) => localDateTime(created_at),
    },
  ];

  return (
    <div>
      <ErrorAlert error={query.error} isError={query.isError} />
      <Table
        loading={query.isLoading}
        dataSource={query.isSuccess ? query.data?.list : []}
        columns={columns}
        pagination={{
          ...defaultPagination,
          total: query.isSuccess ? query.data?.count : 0,
        }}
        onChange={(pagination, filters) => {
          setParams((params) => ({
            ...params,
            offset: (pagination.current! - 1) * pagination.pageSize!,
            limit: pagination.pageSize || 100,
            name: filters.name?.[0] as string,
            phone: filters.phone?.[0] as string,
            email: filters.email?.[0] as string,
            id: filters.id?.[0] as string,
            start_date: filters.start_date?.[0] as string,
            end_date: filters.end_date?.[0] as string,
          }));
        }}
        scroll={{ x: 700, y: "calc(100vh - 220px)" }}
      />
    </div>
  );
}
