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
    },
    {
      key: "8",
      label: "Status",
      children: worker.status,
    },
    {
      key: "2",
      label: "Is Backup",
      children: worker.is_backup ? <Tag color="black">Backup</Tag> : "No",
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
        description={`Phone: ${worker.worker_phone}`}
      />
      <Descriptions style={{ marginTop: "30px" }} items={items} />
    </Card>
  );
};

export default WorkerCard;
