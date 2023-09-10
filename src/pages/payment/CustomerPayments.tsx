import { Button, Popover, Table, Tag } from "antd";
import {
  CustomerPaymentListItem,
  ListResponse,
  orderColors,
} from "../../utils/types";
import { defaultPagination } from "../../utils/pagination";
import { ErrorAlert } from "../../lib/Alerts";
import { useQuery } from "@tanstack/react-query";
import { CustomError } from "../../utils/errors";
import { dateSearchProps, useInputSearch } from "../../lib/searching.hooks";
import { downloadCsv, localDateTime, objToQuery } from "../../utils/func";
import { useState } from "react";
import { SorterResult } from "antd/es/table/interface";
import { fetchCustomerPayments } from "../../net/payment";
import { DownloadOutlined } from "@ant-design/icons";
import OrderMenu from "../../components/menu/order";

const downloadCustomerPayments = (data: CustomerPaymentListItem[]) => {
  downloadCsv(
    [
      {
        header: [
          {
            title: "Created At",
            key: "created_at",
          },
          {
            title: "Order ID",
            key: "order_id",
          },
          {
            title: "Order Status",
            key: "order_status",
          },
          {
            title: "Order Final Price",
            key: "order_final_price",
          },
          {
            title: "Payment Method",
            key: "payment_method",
          },
          {
            title: "Amount",
            key: "amount",
          },
          {
            title: "Tx ID",
            key: "tx_id",
          },
          {
            title: "Remarks",
            key: "remarks",
          },
          {
            title: "Status",
            key: "status",
          },
        ],
        data: data,
      },
    ],
    "customer_payments"
  );
};

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
      title: "CustomerID",
      dataIndex: "customer_id",
      key: "customer_id",
    },
    {
      title: "Order",
      dataIndex: "order_id",
      key: "order_id",
      width: "200px",
      ...getColumnSearchProps("order_id"),
      render: (
        id,
        { order_status, order_final_price }: CustomerPaymentListItem
      ) => (
        <div>
          <OrderMenu center={false} id={id}>
            ID: {id}
          </OrderMenu>
          <div>
            status: <Tag color={orderColors[order_status]}>{order_status}</Tag>
          </div>
          <div>price: {order_final_price}</div>
        </div>
      ),
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
      <div className="flex-between mb-10">
        <Button
          icon={<DownloadOutlined />}
          type="primary"
          onClick={() => downloadCustomerPayments(data.list)}
        >
          Download
        </Button>
        <ErrorAlert isError={isError} error={error} />
      </div>
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

            if (filters.order_id) {
              temp.order_id = filters.order_id[0] as number;
            } else {
              temp.order_id = 0;
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

            return { ...temp };
          });
        }}
      />
    </div>
  );
}
