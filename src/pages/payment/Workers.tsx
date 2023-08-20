import { Table, Drawer, Image, Space, Button, Tag } from "antd";
import { useState } from "react";
import WorkerProfile from "../worker/Profile";
import { PaymentWorkerListItemType } from "../../utils/types";
import { ExpandOutlined } from "@ant-design/icons";
import { downloadWorkerPayments, fetchWorkerPayments } from "../../net/payment";
import { CustomError } from "../../utils/errors";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ErrorAlert } from "../../lib/Alerts";
import { useInputSearch } from "../../lib/searching.hooks";
import { defaultPagination } from "../../utils/pagination";
import { SorterResult } from "antd/es/table/interface";
import UploadPayment from "../../components/payment/transaction/upload-payment";
import { objToQuery } from "../../utils/func";

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
    PaymentWorkerListItemType[],
    CustomError
  >({
    queryKey: [`/worker/payments?${objToQuery(params)}`],
    queryFn: fetchWorkerPayments,
    retry: false,
  });
  const mutation = useMutation(downloadWorkerPayments);
  const { getColumnSearchProps } = useInputSearch();

  const columns = [
    {
      title: "",
      dataIndex: "id",
      key: "pid",
      render: (id: number) => (
        <ExpandOutlined
          style={{ fontSize: "20px" }}
          onClick={() => setWorkerProfileId(id)}
        />
      ),
    },
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      ...getColumnSearchProps("id"),
    },
    {
      title: "Image",
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
      title: "Name",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      width: "120px",
      ...getColumnSearchProps("phone"),
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
      title: "Commission",
      dataIndex: "total_commission",
      key: "total_commission",
      sorter: (a: PaymentWorkerListItemType, b: PaymentWorkerListItemType) =>
        a.total_commission - b.total_commission,
      render: (amount: number = 0) => amount.toFixed(0),
    },
    {
      title: "Total Bonus",
      dataIndex: "total_bonus",
      key: "total_bonus",
      sorter: (a: PaymentWorkerListItemType, b: PaymentWorkerListItemType) =>
        a.total_bonus - b.total_bonus,
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
      sorter: (a: PaymentWorkerListItemType, b: PaymentWorkerListItemType) =>
        a.total_paid - b.total_paid,
      render: (paid: number = 0) => paid.toFixed(0),
    },
    {
      title: "Payable",
      dataIndex: "payable",
      key: "payable",
      sorter: (a: PaymentWorkerListItemType, b: PaymentWorkerListItemType) =>
        a.payable - b.payable,
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
        onChange={(
          pagination,
          filters,
          sorter: SorterResult<PaymentWorkerListItemType>
        ) => {
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
