import { useContext } from "react";
import Styled from "styled-components";
import { Dropdown, MenuProps } from "antd";
import { MailOutlined, PhoneOutlined, UserOutlined } from "@ant-design/icons";
import { AppContext, AppContextType } from "../../pages/App";
import { AdminType } from "../../utils/types";

const ProfileMenuWrapper = Styled.div`

`;

const ProfileInfo = ({ name, email, role, phone }: AdminType) => (
  <ProfileMenuWrapper>
    <h2 className="name">
      {name} ({role})
    </h2>
    <p className="email">
      <MailOutlined /> {email}
    </p>
    <p className="phone">
      <PhoneOutlined /> {phone}
    </p>
  </ProfileMenuWrapper>
);

export default function ProfileMenu() {
  const app = useContext<AppContextType>(AppContext);
  if (!app.user) return null;

  const menuItems: MenuProps = {
    items: [
      {
        key: "profile",
        label: <ProfileInfo {...app.user} />,
      },
      {
        key: "logout",
        label: "Logout",
        style: {
          color: "red",
          fontWeight: "bold",
          fontSize: "16px",
          textAlign: "center",
        },
        onClick: () => {
          localStorage.removeItem("accessToken");
          window.location.href = "/";
        },
      },
    ],
  };

  return (
    <Wrapper>
      <Dropdown menu={menuItems} trigger={["click"]} arrow>
        <div className="user-icon">
          <UserOutlined />
        </div>
      </Dropdown>
    </Wrapper>
  );
}

const Wrapper = Styled.div`
	min-width: 100px;
	margin-left: auto;
	display: flex;
	align-items: center;
	justify-content: center;

	.user-icon {
		width: 40px;
		height: 40px;
		background: #e7e7e7;
		color: #000;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		margin-left: 10px;
		cursor: pointer;
		font-size: 16px;
		transition: all 0.3s ease;

		&:hover {
			background: #d3d3d3;
		}
	}

`;
