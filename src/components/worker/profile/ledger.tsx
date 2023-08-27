import { Col, Space, Table } from "antd";
import { styled } from "styled-components";
import { WorkerLedgerType, WorkerLedgerTypeItem } from "../../../utils/types";
import { CustomError } from "../../../utils/errors";
import { getWorkerLedgerById } from "../../../net/worker";
import { useQuery } from "@tanstack/react-query";
import { ErrorAlert } from "../../../lib/Alerts";
import { localDateTime } from "../../../utils/func";
import { useState } from "react";
import { dateSearchProps } from "../../../lib/searching.hooks";

export default function WorkerLedger({ id }: { id: string | number }) {
  const [date, setDate] = useState<string[]>([]);
  const { isLoading, data, isError, error, isSuccess } = useQuery<
    WorkerLedgerType,
    CustomError
  >({
    queryKey: [
      `/worker/${id}/ledger?${
        date?.length == 2 ? `startDate=${date[0]}&endDate=${date[1]}` : ""
      }`,
      id,
    ],
    queryFn: getWorkerLedgerById,
  });

  const columns = [
    {
      title: "Date & Time",
      dataIndex: "created_at",
      key: "created_at",
      width: "200px",
      ...dateSearchProps(),
      render: (created_at: string) => localDateTime(created_at),
    },
    {
      title: "Topic",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Details",
      key: "details",
      width: "250px",
      render: ({
        account_no,
        note,
        tx_id,
        payment_status,
        order_type,
      }: WorkerLedgerTypeItem) => {
        return (
          <div>
            {account_no && (
              <div className="account_no">Account NO: {account_no}</div>
            )}
            {note && <div className="note">Note: {note}</div>}
            {tx_id && <div className="tx_id">Transaction ID: {tx_id}</div>}
            {payment_status && (
              <div className="payment_status">
                Payment Status: {payment_status}
              </div>
            )}
            {order_type && (
              <div className="order_type">Order Type: {order_type}</div>
            )}
          </div>
        );
      },
    },
    {
      title: "Debit",
      key: "debit",
      render: ({ amount, tx_type }: WorkerLedgerTypeItem) =>
        tx_type === "debit" ? amount.toString() + " BDT" : "-",
    },
    {
      title: "Credit",
      key: "credit",
      render: ({ amount, tx_type }: WorkerLedgerTypeItem) =>
        tx_type === "credit" ? amount.toString() + " BDT" : "-",
    },
  ];

  return (
    <Wrapper span={24} xl={18}>
      <ErrorAlert error={error} isError={isError} />
      <Table
        loading={isLoading}
        columns={columns}
        dataSource={isSuccess && data && data.items ? data.items : []}
        scroll={{
          y: "calc(100vh - 220px)",
          x: "800px",
        }}
        pagination={false}
        onChange={(_, filter) => {
          setDate(filter.created_at as string[]);
        }}
      />
      {isSuccess && data && (
        <div className="footer">
          <div className="item">
            <Space>
              Total Debit <strong>{data.debit.toFixed(2)}</strong>
            </Space>
          </div>
          <div className="item">
            <Space>
              Total Credit <strong>{data.credit.toFixed(2)}</strong>
            </Space>
          </div>
        </div>
      )}
    </Wrapper>
  );
}

const Wrapper = styled(Col)`
  .ant-table-container {
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  }

  .footer {
    background: #fff;
    padding: 10px;
    text-align: right;
    font-weight: 500;
    border-radius: 10px;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3);
    height: 60px;
    margin-top: 10px;

    .item:first-child {
      margin-bottom: 10px;
    }
  }
`;
