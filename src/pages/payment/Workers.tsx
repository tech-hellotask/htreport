import { Table, Drawer, Image, Space, Button } from "antd";
import { useState } from "react";
import WorkerProfile from "../worker/Profile";
import { WorkerType } from "../../utils/types";
import { ExpandOutlined } from "@ant-design/icons";
import { downloadWorkerPayments, fetchWorkerPayments } from "../../net/payment";
import { CustomError } from "../../utils/errors";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ErrorAlert } from "../../lib/Alerts";
import { useInputSearch } from "../../lib/searching.hooks";
import { defaultPagination } from "../../utils/pagination";
import { SorterResult } from "antd/es/table/interface";
import UploadPayment from "../../components/payment/transaction/upload-payment";

const objToQuery = (obj) => {
  const hasValue = [];
  for (const key in obj) {
    if (obj[key]) {
      hasValue.push([key, obj[key]]);
    }
  }
  const query = new URLSearchParams(hasValue).toString();
  return query;
};

export default function PaymentWorkers() {
  const [workerProfileId, setWorkerProfileId] = useState<number | null>(null);
  const [params, setParams] = useState({
    limit: 100,
    offset: 0,
    phone: "",
    name: "",
    nagad: "",
    bkash: "",
    pid: 0,
    order: "desc",
    orderBy: "payable",
  });

  const { isSuccess, data, isLoading, isError, error } = useQuery<
    WorkerType[],
    CustomError
  >({
    queryKey: [`/worker/payments?${objToQuery(params)}`],
    queryFn: fetchWorkerPayments,
  });
  const mutation = useMutation(downloadWorkerPayments);
  const { getColumnSearchProps } = useInputSearch();

  const columns = [
    {
      title: "",
      dataIndex: "id",
      key: "id",
      render: (id: number) => (
        <ExpandOutlined
          style={{ fontSize: "20px" }}
          onClick={() => setWorkerProfileId(id)}
        />
      ),
    },
    {
      title: "Worker ID",
      dataIndex: "pid",
      key: "pid",
      ...getColumnSearchProps("pid"),
    },
    {
      title: "Worker Image",
      dataIndex: "image",
      key: "image",
      render: (image: string) => (
        <div className="table-image">
          <Image
            preview={true}
            src={`https://htmind.live/storage/maids/${
              image || "f55d607f26c0b57327b898e8ea54cbfc.jpg"
            }`}
            alt=""
          />
        </div>
      ),
    },
    {
      title: "Worker Name",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Worker Phone",
      dataIndex: "phone",
      key: "phone",
      ...getColumnSearchProps("phone"),
    },
    {
      title: "Nagad",
      dataIndex: "nagad",
      key: "nagad",
      render: (
        text: string,
        { active_account }: { active_account: string }
      ) => (
        <div
          style={{
            color: ["nagad", "নগদ"].includes(active_account)
              ? "green"
              : "black",
          }}
        >
          {text}
        </div>
      ),
      ...getColumnSearchProps("nagad"),
    },
    {
      title: "Bkash",
      dataIndex: "bkash",
      key: "bkash",
      render: (
        text: string,
        { active_account }: { active_account: string }
      ) => (
        <div
          style={{
            color: ["bkash", "বিকাশ"].includes(active_account)
              ? "green"
              : "red",
          }}
        >
          {text}
        </div>
      ),
      ...getColumnSearchProps("bkash"),
    },
    {
      title: "Total Earning",
      dataIndex: "total_order_amount",
      key: "total_order_amount",
      sorter: (a: WorkerType, b: WorkerType) =>
        a.total_order_amount - b.total_order_amount,
      render: (amount: number = 0) => amount.toFixed(0),
    },
    {
      title: "Total Bonus",
      dataIndex: "total_bonus",
      key: "total_bonus",
      sorter: (a: WorkerType, b: WorkerType) => a.total_bonus - b.total_bonus,
      render: (bonus: number = 0) => bonus.toFixed(0),
    },
    {
      title: "Total Adjustment",
      dataIndex: "total_adjustment",
      key: "total_adjustment",
      render: (adjustment: number = 0) => adjustment.toFixed(0),
    },
    {
      title: "Total Paid",
      dataIndex: "total_paid",
      key: "total_paid",
      sorter: (a: WorkerType, b: WorkerType) => a.total_paid - b.total_paid,
      render: (paid: number = 0) => paid.toFixed(0),
    },
    {
      title: "Payable",
      dataIndex: "payable",
      key: "payable",
      sorter: (a: WorkerType, b: WorkerType) => a.payable - b.payable,
      render: (payable: number = 0) => payable.toFixed(0),
    },
  ];

  return (
    <div>
      <ErrorAlert isError={isError} error={error} />
      <div className="flex-between" style={{ marginBottom: "10px" }}>
        <div></div>
        <Space>
          <UploadPayment />
          <Button onClick={() => mutation.mutate("nagad")} type="primary">
            Nagad
          </Button>
          <Button onClick={() => mutation.mutate("bkash")} type="primary">
            Bkash
          </Button>
        </Space>
      </div>
      <Table
        loading={isLoading}
        columns={columns}
        dataSource={isSuccess ? data : []}
        scroll={{ x: 1000, y: "calc(100vh - 240px)" }}
        pagination={defaultPagination}
        onChange={(pagination, filters, sorter: SorterResult<WorkerType>) => {
          const tempParams = { ...params };
          tempParams.limit = pagination.pageSize;
          tempParams.offset = (pagination.current - 1) * pagination.pageSize;
          tempParams.pid = filters.pid ? parseInt(filters.pid.toString()) : 0;
          tempParams.phone = filters.phone?.toString() || "";
          tempParams.name = filters.name?.toString() || "";
          tempParams.nagad = filters.nagad?.toString() || "";
          tempParams.bkash = filters.bkash?.toString() || "";
          if (sorter.order && sorter.field) {
            tempParams.orderBy = sorter.field as string;
            tempParams.order = sorter.order === "ascend" ? "asc" : "desc";
          }
          setParams(tempParams);
        }}
      />
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
