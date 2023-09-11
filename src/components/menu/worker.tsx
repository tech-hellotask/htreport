import { Drawer, Dropdown, MenuProps } from "antd";
import { ExpandOutlined, UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import styled from "styled-components";
import WorkerProfile from "../../pages/worker";
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
  const [open, setOpen] = useState("");
  const items: MenuProps["items"] = [
    {
      label: (
        <div className="flex-between" onClick={() => setOpen("profile")}>
          Open Here
        </div>
      ),
      icon: <ExpandOutlined />,
      key: "open",
    },
    {
      label: <Link to={`/worker/${id}`}>Go To Profile</Link>,
      icon: <UserOutlined />,
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
          open={open !== ""}
          onClose={() => setOpen("")}
          width={1200}
          style={{ backgroundColor: "#f6f6f6" }}
        >
          {open === "profile" && <WorkerProfile id={Number(id)} />}
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
