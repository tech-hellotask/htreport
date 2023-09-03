import { useQuery } from "@tanstack/react-query";
import { getServices } from "../../net/service";
import { Table } from "antd";
import { ListResponse, ServiceListItemType } from "../../utils/types";
import { CustomError } from "../../utils/errors";
import { defaultPagination } from "./../../utils/pagination";
import { localDateTime } from "../../utils/func";

export default function ServiceList() {
  const query = useQuery<ListResponse<ServiceListItemType>, CustomError>({
    queryKey: ["service/list"],
    queryFn: getServices,
  });

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Details",
      dataIndex: "details",
      key: "details",
    },
    {
      title: "Worker Category",
      dataIndex: "worker_category",
      key: "worker_category",
    },
    {
      title: "Is Active",
      dataIndex: "is_active",
      key: "is_active",
      render: (isActive: boolean) => (isActive ? "Yes" : "No"),
    },
    {
      title: "Date Created",
      dataIndex: "created_at",
      key: "created_at",
      render: (date: string) => localDateTime(date),
    },
  ];
  return (
    <div>
      <Table
        loading={query.isLoading}
        dataSource={query.isSuccess ? query.data?.list : []}
        columns={columns}
        pagination={{
          ...defaultPagination,
          total: query.data?.count || 0,
        }}
      />
    </div>
  );
}
