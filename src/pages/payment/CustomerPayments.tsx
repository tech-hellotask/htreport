import { Button, Popover, Table } from "antd";
import { CustomerPaymentListItem, ListResponse } from "../../utils/types";
import { defaultPagination } from "../../utils/pagination";
import { ErrorAlert } from "../../lib/Alerts";
import { useQuery } from "@tanstack/react-query";
import { CustomError } from "../../utils/errors";
import { dateSearchProps, useInputSearch } from "../../lib/searching.hooks";
import { localDateTime, objToQuery } from "../../utils/func";
import { useState } from "react";
import { SorterResult } from "antd/es/table/interface";
import { fetchCustomerPayments } from "../../net/payment";

export default function CustomerPayments() {
  const [params, setParams] = useState({
    limit: 100,
    offset: 0,
    from: "",
    to: "",
    id: 0,
    order_id: 0,
    payment_method: "",
    tx_id: 0,
    remarks: "",
    status: "",
    amount: 0,
    order: "desc",
    order_by: "created_at",
  });
  const { getColumnSearchProps } = useInputSearch();

  const { isSuccess, data, isLoading, isError, error } = useQuery<
    ListResponse<CustomerPaymentListItem>,
    CustomError
  >({
    queryKey: [`/customer-payment?${objToQuery(params)}`],
    queryFn: fetchCustomerPayments,
  });

  const columns = [
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      sorter: true,
      width: "200px",
      ...dateSearchProps(),
      render: (text: string) => localDateTime(text),
    },
    {
      title: "Order ID",
      dataIndex: "order_id",
      key: "order_id",
      ...getColumnSearchProps("order_id"),
    },
    {
      title: "Payment Method",
      dataIndex: "payment_method",
      key: "payment_method",
      ...getColumnSearchProps("payment_method"),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      sorter: true,
      ...getColumnSearchProps("amount"),
    },
    {
      title: "Tx ID",
      dataIndex: "tx_id",
      key: "tx_id",
      ...getColumnSearchProps("tx_id"),
    },
    {
      title: "Remarks",
      dataIndex: "remarks",
      key: "remarks",
      ...getColumnSearchProps("remarks"),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      ...getColumnSearchProps("status"),
    },
    {
      title: "Meta Info",
      dataIndex: "meta_info",
      key: "meta_info",
      render: (data) =>
        data ? (
          <Popover
            content={
              <pre
                className="custom-scroll scroll-x"
                style={{ width: "300px", maxHeight: "500px" }}
              >
                {JSON.stringify(data, null, 2)}
              </pre>
            }
            showArrow
            placement="left"
          >
            <Button>Details</Button>
          </Popover>
        ) : (
          ""
        ),
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
        onChange={(
          pagination,
          filters,
          sorter: SorterResult<CustomerPaymentListItem>
        ) => {
          setParams((prev) => {
            const temp = { ...prev };
            temp.limit = pagination.pageSize as number;
            temp.offset = (((pagination.current as number) - 1) *
              pagination.pageSize) as number;

            if (filters.created_at?.length === 2) {
              temp.from = filters.created_at[0] as string;
              temp.to = filters.created_at[1] as string;
            } else {
              temp.from = "";
              temp.to = "";
            }

            if (filters.id) {
              temp.id = filters.id[0] as number;
            } else {
              temp.id = 0;
            }

            if (filters.amount) {
              temp.amount = filters.amount[0] as number;
            } else {
              temp.amount = 0;
            }

            if (filters.payment_method) {
              temp.payment_method = filters.payment_method[0] as string;
            } else {
              temp.payment_method = "";
            }

            if (filters.tx_id) {
              temp.tx_id = filters.tx_id[0] as number;
            } else {
              temp.tx_id = 0;
            }

            if (filters.remarks) {
              temp.remarks = filters.remarks[0] as string;
            } else {
              temp.remarks = "";
            }

            if (filters.status) {
              temp.status = filters.status[0] as string;
            } else {
              temp.status = "";
            }

            if (sorter.field) {
              temp.order_by = sorter.field as string;
            } else {
              temp.order_by = "created_at";
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
