import { Drawer, Dropdown, MenuProps } from "antd";
import { ExpandOutlined, UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import styled from "styled-components";
import WorkerProfile from "../../pages/worker/Profile";
import { useState } from "react";

export default function WorkerMenu({
  children,
  id,
  name,
  phone,
  center = true,
}: {
  children?: React.ReactNode;
  id: number | string;
  name?: string;
  phone?: string;
  center?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const items: MenuProps["items"] = [
    {
      label: <Link to={`/worker/${id}/profile`}>Profile</Link>,
      icon: <UserOutlined />,
      key: "profile",
    },
    {
      label: <div onClick={() => setOpen(true)}>Open</div>,
      icon: <ExpandOutlined />,
      key: "ledger",
    },
  ];

  if (name || phone) {
    items.push({
      label: (
        <div>
          <div>{name}</div>
          <div>{phone}</div>
        </div>
      ),
      key: "info",
      disabled: true,
    });
  }

  return (
    <div style={{ cursor: "pointer" }}>
      <Dropdown menu={{ items }} trigger={["click"]}>
        <Styles style={{ textAlign: center ? "center" : "left" }}>
          {children || id}
        </Styles>
      </Dropdown>
      {open && (
        <Drawer
          title="Worker Profile"
          open={open}
          onClose={() => setOpen(false)}
          width={1200}
        >
          <WorkerProfile id={Number(id)} />
        </Drawer>
      )}
    </div>
  );
}

const Styles = styled.div`
  transition: all 0.2s ease-in-out;

  &:hover {
    scale: 1.1;
  }
`;
