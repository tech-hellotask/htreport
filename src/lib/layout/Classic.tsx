import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Menu, Button, Space, Breadcrumb } from "antd";
import { useContext } from "react";
import { LayoutContext, LayoutProps } from ".";
import "./layout.scss";
import { useSearchParams } from "react-router-dom";
import ProfileMenu from "./ProfileMenu";

const { Header, Sider, Content } = Layout;

function Sidebar() {
  const { collapsed, items } = useContext<LayoutProps>(LayoutContext);
  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      style={{
        overflow: "auto",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
      }}
      className="custom-scroll sidebar"
    >
      <div className="app-logo">
        {collapsed ? (
          <span>
            H<span className="last">T</span>
          </span>
        ) : (
          <span>
            Hello<span className="last">Task</span>
          </span>
        )}
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultOpenKeys={["payment"]}
        // defaultSelectedKeys={["payment_workers"]}
        items={items}
      />
    </Sider>
  );
}

const ClassicLayout: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { collapsed, setCollapsed } = useContext<LayoutProps>(LayoutContext);
  const [params] = useSearchParams();
  const title = params.get("title") || "";
  return (
    <div className="app app-classic">
      <Layout hasSider className="app-layout">
        <Sidebar />
        <Layout style={{ marginLeft: collapsed ? 80 : 200 }}>
          <Header className="app-header">
            <Space>
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: "16px",
                  width: 64,
                  height: 64,
                }}
              />
              {title && (
                <Breadcrumb
                  items={title.split(">").map((title: string) => ({
                    title,
                  }))}
                />
              )}
            </Space>
            <div>
              <ProfileMenu />
            </div>
          </Header>
          <Content className="app-content">{children}</Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default ClassicLayout;
