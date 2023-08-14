import { Space, Table, Image } from "antd";
import { ErrorAlert } from "../../lib/Alerts";
import { defaultPagination } from "../../utils/pagination";
import { AdminType } from "./../../utils/types";
import { useQuery } from "@tanstack/react-query";
import { CustomError } from "../../utils/errors";
import UserRegistration from "../../components/user/Registration";
import CreateUserRole from "../../components/user/CreateRole";
import { fetchAdminList } from "../../net/admin";

const columns = [
  {
    title: "Image",
    dataIndex: "image",
    key: "image",
    render: (image: string) => (
      <Image className="table-image" src={image} preview={true} />
    ),
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Phone",
    dataIndex: "phone",
    key: "phone",
  },
];

export default function UserList() {
  const { isSuccess, data, isLoading, isError, error } = useQuery<
    AdminType[],
    CustomError
  >({
    queryKey: ["/admin/list"],
    queryFn: fetchAdminList,
  });

  return (
    <div>
      <div className="flex-between" style={{ marginBottom: "10px" }}>
        <Space>
          <UserRegistration />
          <CreateUserRole />
        </Space>
        <ErrorAlert isError={isError} error={error} />
      </div>
      <Table
        loading={isLoading}
        columns={columns}
        dataSource={isSuccess ? data : []}
        scroll={{ x: 1000 }}
        pagination={defaultPagination}
      />
    </div>
  );
}
