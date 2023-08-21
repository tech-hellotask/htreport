import { useState, createContext } from "react";
import ClassicLayout from "./Classic";
import {
  OrderedListOutlined,
  UploadOutlined,
  UserOutlined,
  // VideoCameraOutlined,
} from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import { MenuItemType } from "../../utils/types";

export const getMenuItem = (item: MenuItemType): MenuItemType => {
  return {
    key: item.key,
    icon: item.icon,
    label: item.link ? (
      <NavLink
        to={`${item.link}?title=${item.title || item.link.substring(1)}`}
      >
        {item.label}
      </NavLink>
    ) : (
      item.label
    ),
    children: item.children?.map(getMenuItem),
    type: item.type,
  } as MenuItemType;
};

const menuItems = [
  {
    key: "home",
    icon: <UserOutlined />,
    label: "Home",
    link: "/",
  },
  {
    key: "users",
    icon: <UploadOutlined />,
    label: "Users",
    link: "/users",
    title: "Users",
  },
  {
    key: "workers",
    icon: <UploadOutlined />,
    label: "Workers",
    children: [
      {
        key: "worker_create",
        icon: <OrderedListOutlined />,
        label: "Add New",
        link: "/worker/create",
        title: "Worker > Create",
      },
      {
        key: "worker_list",
        icon: <OrderedListOutlined />,
        label: "List",
        link: "/worker/list",
        title: "Worker > List",
      },
    ],
  },
  {
    key: "payment",
    icon: <UploadOutlined />,
    label: "Payment",
    children: [
      {
        key: "payment_workers",
        icon: <OrderedListOutlined />,
        label: "Payable",
        link: "/payment/payable",
        title: "Payment > Payable",
      },
      {
        key: "payment_adjustment",
        icon: <OrderedListOutlined />,
        label: "Adjustment",
        link: "/payment/adjustment",
        title: "Payment > Adjustment",
      },
      {
        key: "payment_bonus",
        icon: <OrderedListOutlined />,
        label: "Bonus",
        link: "/payment/bonus",
        title: "Payment > Worker Bonus",
      },
      {
        key: "payment_orders",
        icon: <OrderedListOutlined />,
        label: "Orders",
        link: "/payment/orders",
        title: "Payment > Orders",
      },
      {
        key: "payment_transactions",
        icon: <OrderedListOutlined />,
        label: "Transactions",
        link: "/payment/transactions",
        title: "Payment > Transactions",
      },
    ],
  },
  {
    key: "service",
    icon: <UploadOutlined />,
    label: "Service",
    link: "/service",
    title: "Services",
  },
].map((item) => getMenuItem(item));

export const LayoutContext = createContext<LayoutProps>({} as LayoutProps);

export interface LayoutProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  items: MenuItemType[];
}

const AppLayout: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <LayoutContext.Provider
      value={{
        collapsed,
        setCollapsed,
        items: menuItems,
      }}
    >
      <ClassicLayout>{children}</ClassicLayout>
    </LayoutContext.Provider>
  );
};

export default AppLayout;
