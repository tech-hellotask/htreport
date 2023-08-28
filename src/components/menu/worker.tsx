import { Dropdown, MenuProps } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import styled from "styled-components";

export default function WorkerMenu({
  children,
  id,
  name,
  phone,
}: {
  children?: React.ReactNode;
  id: number | string;
  name?: string;
  phone?: string;
}) {
  const items: MenuProps["items"] = [
    {
      label: <Link to={`/worker/${id}/profile`}>Profile</Link>,
      icon: <UserOutlined />,
      key: "profile",
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
        <Styles>{children || id}</Styles>
      </Dropdown>
    </div>
  );
}

const Styles = styled.div`
  transition: all 0.2s ease-in-out;
  text-align: center;

  &:hover {
    scale: 1.1;
  }
`;