import { useQuery } from "@tanstack/react-query";
import { Button, Drawer, Table } from "antd";
import { useState } from "react";
import { getActivityLog, getActivityLogs } from "../../net/activity_logs";
import { localDateTime, objToQuery } from "../../utils/func";
import { ActivityLogType, ListResponse } from "../../utils/types";
import { CustomError } from "../../utils/errors";
import { defaultPagination } from "../../utils/pagination";
import { ErrorAlert } from "../../lib/Alerts";
import { RightOutlined } from "@ant-design/icons";
import { dateSearchProps, useInputSearch } from "../../lib/searching.hooks";

function ActivityLogDetails({
  id,
  setId,
}: {
  id: number;
  setId: (id: number) => void;
}) {
  const query = useQuery<ActivityLogType, CustomError>({
    queryKey: [`/logs/activity/${id}`],
    queryFn: getActivityLog,
  });

  return (
    <div>
      <Drawer
        open={id !== 0}
        onClose={() => setId(0)}
        width={500}
        title="Activity Log Details"
      >
        {query.isLoading && <div>Loading...</div>}
        <ErrorAlert error={query.error} isError={query.isError} />
        {query.isSuccess && (
          <div>
            <div>
              <b>Date & Time: </b>
              {localDateTime(query.data.created_at)}
            </div>
            <div>
              <b>User ID: </b>
              {query.data.user_id}
            </div>
            <div>
              <b>User: </b>
              {query.data.user_email}
            </div>
            <div>
              <b>Type: </b>
              {query.data.type}
            </div>
            <div>
              <b>Message: </b>
              {query.data.msg}
            </div>
            <div>
              <b>Request Info: </b>
              <pre>{JSON.stringify(query.data.req_info, null, 2)}</pre>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
}

export default function ActivityLogs() {
  const [params, setParams] = useState({
    limit: 100,
    offset: 0,
    start_date: "",
    end_date: "",
    user_id: 0,
    user_email: "",
  });
  const query = useQuery<ListResponse<ActivityLogType>, CustomError>({
    queryKey: [`/logs/activity?${objToQuery(params)}`],
    queryFn: getActivityLogs,
  });
  const [id, setId] = useState(0);
  const { getColumnSearchProps } = useInputSearch();

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
      title: "User ID",
      dataIndex: "user_id",
      width: "100px",
      key: "user_id",
      ...getColumnSearchProps("user_id"),
    },
    {
      title: "User",
      dataIndex: "user_email",
      key: "user_email",
      width: "160px",
      ...getColumnSearchProps("user_email"),
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      width: "140px",
    },
    {
      title: "Message",
      dataIndex: "msg",
      key: "msg",
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      width: "80",
      render: (id: number) => (
        <Button
          type="primary"
          icon={<RightOutlined />}
          onClick={() => setId(id)}
        />
      ),
    },
  ];
  return (
    <div>
      <ErrorAlert error={query.error} isError={query.isError} />
      <Table
        loading={query.isLoading}
        columns={columns}
        dataSource={query.isSuccess ? query.data.list : []}
        pagination={{
          ...defaultPagination,
          total: query.isSuccess ? query.data.count : 0,
        }}
        scroll={{ x: 900, y: "calc(100vh - 220px)" }}
        onChange={(pagination, filters) => {
          setParams({
            ...params,
            limit: pagination.pageSize,
            offset: (pagination.current - 1) * pagination.pageSize,
            start_date: filters.created_at?.[0] as string,
            end_date: filters.created_at?.[1] as string,
            user_id: filters.user_id?.[0] as number,
            user_email: filters.user_email?.[0] as string,
          });
        }}
      />
      {id !== 0 && <ActivityLogDetails id={id} setId={setId} />}
    </div>
  );
}
