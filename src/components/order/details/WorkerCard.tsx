import {
  Avatar,
  Card,
  Descriptions,
  DescriptionsProps,
  Space,
  Tag,
} from "antd";
import { localDateTime } from "../../../utils/func";
import WorkerMenu from "../../menu/worker";
import { OrderDetailsWorker } from "../../../utils/types";

const WorkerCard = ({ worker }: { worker: OrderDetailsWorker }) => {
  const items: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "Working Time",
      children: `${localDateTime(worker.start_time)} - ${localDateTime(
        worker.end_time
      )}`,
      span: 2,
    },
    {
      key: "6",
      label: "Commission",
      children: worker.commission,
      span: 2,
    },
    {
      key: "8",
      label: "Status",
      children: worker.status,
      span: 2,
    },
    {
      key: "2",
      label: "Is Backup",
      children: <Tag color="black">{worker.is_backup ? "Backup" : "No"}</Tag>,
      span: 2,
    },
    {
      key: "3",
      label: "Payment",
      children: (
        <div>
          <div>Status: {worker.payment_id > 0 ? "Paid" : "Unpaid"} </div>
          {worker.payment_id > 0 && (
            <>
              <div>Payment ID: {worker.payment_id}</div>
              <div>Account No: {worker.payment_account_no}</div>
              <div>Method: {worker.payment_method}</div>
              <div>Paid At: {localDateTime(worker.payment_created_at)}</div>
            </>
          )}
        </div>
      ),
      span: 2,
    },
  ];

  return (
    <Card
      bordered={false}
      style={{
        boxShadow: "0px 1px 2px rgba(0,0,0,.3)",
        margin: 0,
        marginTop: "10px",
      }}
    >
      <Card.Meta
        avatar={<Avatar src={worker.worker_image} />}
        title={
          <Space>
            <WorkerMenu
              id={worker.worker_id}
              children={`${worker.worker_name} (${worker.worker_id})`}
              center={false}
            />
          </Space>
        }
        description={`Created AT: ${localDateTime(worker.created_at)}`}
      />
      <Descriptions style={{ marginTop: "30px" }} items={items} />
    </Card>
  );
};

export default WorkerCard;
