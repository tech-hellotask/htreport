import { Dropdown, MenuProps } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

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
        <div>{children || id}</div>
      </Dropdown>
    </div>
  );
}
