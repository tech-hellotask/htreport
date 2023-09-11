import { WorkerType } from "../../utils/types";
import styled from "styled-components";
import WorkerProfileInfo from "../../components/worker/profile/info";
import { useQuery } from "@tanstack/react-query";
import { CustomError } from "../../utils/errors";
import { getWorkerById } from "../../net/worker";
import { ErrorAlert } from "../../lib/Alerts";
import { useParams } from "react-router-dom";
import { Col, Menu, Row } from "antd";
import WorkerLedger from "./Ledger";
import WorkerOrders from "./Orders";
import { useEffect, useState } from "react";
import { pushState } from "../../utils/func";
import { DollarOutlined, InsertRowAboveOutlined } from "@ant-design/icons";

export default function WorkerProfile({
  id,
  defaultOpen = "ledger",
}: {
  children?: React.ReactNode;
  id?: string | number;
  defaultOpen?: string;
}) {
  const { id: workerId } = useParams<{ id: string }>();
  if (!id) {
    id = Number(workerId);
  }
  const [open, setOpen] = useState(defaultOpen);
  const {
    isSuccess,
    data: worker,
    isLoading,
    isError,
    error,
  } = useQuery<WorkerType, CustomError>({
    queryKey: [`/worker/${id}/profile`, id],
    queryFn: getWorkerById,
  });

  useEffect(() => {
    const search = new URLSearchParams(window.location.search);
    const open = search.get("open");
    if (open) {
      setOpen(open);
    }
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <ErrorAlert isError={isError} error={error} />;

  return (
    <Wrapper gutter={[24, 16]}>
      {isSuccess && <WorkerProfileInfo worker={worker} />}
      <Col span={24} xl={18}>
        <Menu
          mode="horizontal"
          defaultSelectedKeys={[open]}
          style={{ marginBottom: 16 }}
          theme={"dark"}
          items={[
            {
              label: "Ledger",
              key: "ledger",
              icon: <DollarOutlined />,
              onClick: () => {
                setOpen("ledger");
                pushState(`${window.location.pathname}?open=ledger`);
              },
            },
            {
              label: "Orders",
              key: "orders",
              icon: <InsertRowAboveOutlined />,
              onClick: () => {
                setOpen("orders");
                pushState(`${window.location.pathname}?open=orders`);
              },
            },
          ]}
        />
        {open === "ledger" && <WorkerLedger id={id} />}
        {open === "orders" && <WorkerOrders id={id} />}
      </Col>
    </Wrapper>
  );
}

const Wrapper = styled(Row)`
  .ant-menu-overflow {
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.4);
    border-radius: 10px;
    overflow: hidden;
    letter-spacing: 1px;
  }
`;
