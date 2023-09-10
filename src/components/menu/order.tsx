import { Drawer, Dropdown, MenuProps } from "antd";
import { ExpandOutlined, UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";
import OrderDetails from "../../pages/order/Details";

export default function OrderMenu({
  children,
  id,
  center = true,
}: {
  children?: React.ReactNode;
  id: number | string;
  center?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const items: MenuProps["items"] = [
    {
      label: <Link to={`/order/${id}`}>Go To Details</Link>,
      icon: <UserOutlined />,
      key: "profile",
    },
    {
      label: <div onClick={() => setOpen(true)}>Open</div>,
      icon: <ExpandOutlined />,
      key: "drawer",
    },
  ];

  return (
    <div style={{ cursor: "pointer" }}>
      <Dropdown menu={{ items }} trigger={["click"]}>
        <Styles style={{ textAlign: center ? "center" : "left" }}>
          {children || id}
        </Styles>
      </Dropdown>
      {open && (
        <Drawer
          title="Order Details"
          open={open}
          onClose={() => setOpen(false)}
          width={1200}
        >
          <OrderDetails id={Number(id)} />
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
