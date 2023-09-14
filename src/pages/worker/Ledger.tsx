import { Space, Table, Tag } from "antd";
import { styled } from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getWorkerLedgerById } from "../../net/worker";
import { WorkerLedgerType, WorkerLedgerTypeItem } from "../../utils/types";
import { CustomError } from "../../utils/errors";
import { dateSearchProps } from "../../lib/searching.hooks";
import { localDateTime } from "../../utils/func";
import { ErrorAlert } from "../../lib/Alerts";

export default function WorkerLedger({ id }: { id?: string | number }) {
  const [date, setDate] = useState<string[]>([]);
  const { id: workerId } = useParams<{ id: string }>();
  if (!id) {
    id = Number(workerId);
  }
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
        remarks,
        order_id,
        status,
        order_status,
        is_backup,
        payment_id,
        payment_method,
        payment_created_at,
        payment_account_no,
        type,
      }: WorkerLedgerTypeItem) => {
        return (
          <div>
            {type === "Payment" && payment_id > 0 && (
              <>
                <div>ID: {payment_id}</div>
                <div>Payment Method: {payment_method}</div>
              </>
            )}
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
            {order_id > 0 && (
              <Link to={`/order/${order_id}`} className="order_id">
                Order: {order_id} ({order_status})
              </Link>
            )}
            {status && <div className="status">Status: {status}</div>}
            {order_type && (
              <div className="order_type">Order Type: {order_type}</div>
            )}
            {remarks && <div className="remarks">Remarks: {remarks}</div>}
            {is_backup && (
              <div className="is_backup">
                Is Backup: <Tag color="black">Backup</Tag>
              </div>
            )}
            {payment_id != 0 && type == "Order" && (
              <div className="is_paid">
                <div>
                  <strong>Payment ID</strong>: {payment_id}
                </div>
                <div>
                  <strong>Account No</strong>: {payment_account_no}
                </div>
                <div>
                  <strong>Paid At</strong>: {localDateTime(payment_created_at)}
                </div>
              </div>
            )}
          </div>
        );
      },
    },
    {
      title: "Debit",
      key: "debit",
      render: ({
        amount,
        tx_type,
        is_delete,
        payment_id,
      }: WorkerLedgerTypeItem) =>
        tx_type === "debit" ? (
          is_delete ? (
            <Tag color="red">
              <del>{amount.toString()} BDT</del>
            </Tag>
          ) : (
            <Tag color={payment_id !== 0 ? "green" : "pink"}>
              {amount.toString()} BDT
            </Tag>
          )
        ) : (
          "-"
        ),
    },
    {
      title: "Credit",
      key: "credit",
      render: ({ amount, tx_type }: WorkerLedgerTypeItem) =>
        tx_type === "credit" ? (
          <Tag color="green">{amount.toString()} BDT</Tag>
        ) : (
          "-"
        ),
    },
  ];

  return (
    <Wrapper>
      <ErrorAlert error={error} isError={isError} />
      <Table
        loading={isLoading}
        columns={columns}
        dataSource={isSuccess && data && data.items ? data.items : []}
        scroll={{
          y: "calc(100vh - 290px)",
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

const Wrapper = styled.div`
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
