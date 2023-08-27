import { Table, Drawer, Space, Button, Tag, Row, Col } from "antd";
import { useState } from "react";
import WorkerProfile from "../worker/Profile";
import { PaymentPayableType } from "../../utils/types";
import { downloadWorkerPayments, fetchPaymentPayable } from "../../net/payment";
import { CustomError } from "../../utils/errors";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ErrorAlert } from "../../lib/Alerts";
import { useInputSearch } from "../../lib/searching.hooks";
import UploadPayment from "../../components/payment/transaction/upload-payment";
import WorkerMenu from "../../components/menu/worker";
import { DownloadOutlined } from "@ant-design/icons";
import { downloadCsv } from "../../utils/func";
import PaymentLatestLog from "../../components/payment/transaction/log";

export default function PaymentWorkers() {
  const [workerProfileId, setWorkerProfileId] = useState<number | null>(null);
  const { isSuccess, data, isLoading, isError, error } = useQuery<
    PaymentPayableType[],
    CustomError
  >({
    queryKey: [`/payment/payable`],
    queryFn: fetchPaymentPayable,
    retry: false,
  });
  const [downloadType, setDownloadType] = useState<"nagad" | "bkash">();
  const mutation = useMutation(downloadWorkerPayments);
  const { getColumnSearchProps } = useInputSearch();

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: "80px",
      ...getColumnSearchProps("id"),
      sorter: (a: PaymentPayableType, b: PaymentPayableType) => {
        return a.id - b.id;
      },
      render: (id: number, { name }) => <WorkerMenu id={id} name={name} />,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "160px",
      ...getColumnSearchProps("name"),
      sorter: (a: PaymentPayableType, b: PaymentPayableType) => {
        return a.name.localeCompare(b.name);
      },
      render: (name: string, { id }) => (
        <WorkerMenu id={id} name={name}>
          {name}
        </WorkerMenu>
      ),
    },
    {
      title: "Nagad",
      dataIndex: "nagad",
      key: "nagad",
      width: "120px",
      render: (
        text: string,
        { active_account }: { active_account: string }
      ) => (
        <Tag
          color={
            ["nagad", "নগদ"].includes(active_account) ? "geekblue" : "gray"
          }
        >
          {text}
        </Tag>
      ),
      ...getColumnSearchProps("nagad"),
    },
    {
      title: "Bkash",
      dataIndex: "bkash",
      key: "bkash",
      width: "120px",
      render: (
        text: string,
        { active_account }: { active_account: string }
      ) => (
        <Tag
          color={
            ["bkash", "বিকাশ"].includes(active_account) ? "geekblue" : "gray"
          }
        >
          {text}
        </Tag>
      ),
      ...getColumnSearchProps("bkash"),
    },
    {
      title: "Payable",
      dataIndex: "payable",
      key: "payable",
      sorter: (a: PaymentPayableType, b: PaymentPayableType) =>
        a.payable - b.payable,
      render: (payable: number = 0) => payable.toFixed(0),
    },
  ];

  const downloadData = (data) => {
    downloadCsv(
      [
        {
          header: [
            {
              title: "ID",
              key: "id",
            },
            {
              title: "Name",
              key: "name",
            },
            {
              title: "Nagad",
              key: "nagad",
            },
            {
              title: "Bkash",
              key: "bkash",
            },
            {
              title: "Payable",
              key: "payable",
            },
          ],
          data,
        },
      ],
      "worker_payments"
    );
  };

  return (
    <div>
      <ErrorAlert isError={isError} error={error} />
      <Row gutter={[24, 16]}>
        <Col span={24} md={20} lg={12}>
          <div style={{ marginBottom: "20px" }}>
            <Space>
              <Button
                icon={<DownloadOutlined />}
                onClick={() => {
                  mutation.mutate("নগদ");
                  setDownloadType("nagad");
                }}
                type="primary"
                style={{ background: "rgb(227 48 35 / 68%)" }}
                loading={mutation.isLoading && downloadType == "nagad"}
              >
                Initiate Nagad Payment
              </Button>
              <Button
                icon={<DownloadOutlined />}
                onClick={() => {
                  mutation.mutate("বিকাশ");
                  setDownloadType("bkash");
                }}
                type="primary"
                style={{ background: "#e1126ed6" }}
                loading={mutation.isLoading && downloadType == "bkash"}
              >
                Initiate Bkash Payment
              </Button>
            </Space>
          </div>
          <PaymentLatestLog />
          <UploadPayment />
        </Col>
        <Col span={24} lg={12}>
          <div className="mb-10">
            <Button
              onClick={() => downloadData(data)}
              icon={<DownloadOutlined />}
              type="primary"
            >
              Download
            </Button>
          </div>
          <Table
            loading={isLoading}
            columns={columns}
            dataSource={isSuccess ? data : []}
            scroll={{ x: 300, y: "calc(100vh - 200px)" }}
            pagination={false}
          />
        </Col>
      </Row>
      <Drawer
        title="Worker Profile"
        placement="right"
        closable={true}
        onClose={() => setWorkerProfileId(null)}
        open={!!workerProfileId}
        width={Math.min(1200, window.innerWidth)}
      >
        <WorkerProfile id={workerProfileId!} />
      </Drawer>
    </div>
  );
}
