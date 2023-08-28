import { useState, createContext } from "react";
import ClassicLayout from "./Classic";
import {
  CreditCardOutlined,
  DollarOutlined,
  FileAddOutlined,
  FileSearchOutlined,
  GiftOutlined,
  HomeOutlined,
  InsertRowAboveOutlined,
  PlusOutlined,
  RobotOutlined,
  ShopOutlined,
  SyncOutlined,
  ToolOutlined,
  TransactionOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import { MenuItemType } from "../../utils/types";

const getMenuItem = (item: MenuItemType): MenuItemType => {
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
    icon: <HomeOutlined className="font-20" />,
    label: "Home",
    link: "/",
  },
  {
    key: "payment",
    icon: <DollarOutlined className="font-20" />,
    label: "Payment",
    children: [
      {
        key: "payment_adjustment",
        icon: <FileAddOutlined />,
        label: "Adjustment",
        link: "/payment/adjustment",
        title: "Payment > Adjustment",
      },
      {
        key: "payment_bonus",
        icon: <GiftOutlined />,
        label: "Bonus",
        link: "/payment/bonus",
        title: "Payment > Worker Bonus",
      },
      {
        key: "payment_payable",
        icon: <CreditCardOutlined />,
        label: "Payable",
        link: "/payment/payable",
        title: "Payment > Payable",
      },

      {
        key: "sync_payment_payable",
        icon: <SyncOutlined />,
        label: "Sync",
        link: "/payment/sync",
        title: "Payment > Sync",
      },
      {
        key: "payment_transactions",
        icon: <TransactionOutlined />,
        label: "Transactions",
        link: "/payment/transactions",
        title: "Payment > Transactions",
      },
      {
        key: "payment_logs",
        icon: <FileSearchOutlined />,
        label: "Logs",
        link: "/payment/logs",
        title: "Payment > Logs",
      },
    ],
  },
  {
    key: "orders",
    icon: <ShopOutlined className="font-20" />,
    label: "Orders",
    title: "Orders",
    children: [
      {
        key: "order_list",
        icon: <InsertRowAboveOutlined />,
        label: "List",
        link: "/order/list",
        title: "Order > List",
      },
    ],
  },
  {
    key: "users",
    icon: <UserSwitchOutlined className="font-20" />,
    label: "Users",
    link: "/users",
    title: "Users",
  },
  {
    key: "workers",
    icon: <RobotOutlined className="font-20" />,
    label: "Workers",
    children: [
      {
        key: "worker_create",
        icon: <PlusOutlined />,
        label: "Add New",
        link: "/worker/create",
        title: "Worker > Create",
      },
      {
        key: "worker_list",
        icon: <InsertRowAboveOutlined />,
        label: "List",
        link: "/worker/list",
        title: "Worker > List",
      },
    ],
  },
  {
    key: "services",
    icon: <ToolOutlined className="font-20" />,
    label: "Services",
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
