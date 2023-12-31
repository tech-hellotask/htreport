import { useQuery } from "@tanstack/react-query";
import Home from "./home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AppLayout from "../lib/layout";
import UserList from "./user/UserList";
import Login from "./login";
import CreateWorker from "./worker/Create";
import WorkerList from "./worker/List";
import CreateService from "./service/Create";
import PaymentWorkers from "./payment/Payable";
import PaymentAdjustment from "./payment/Adjustments";
import OrderList from "./order/List";
import PaymentTransactions from "./payment/Transactions";
import WorkerProfile from "./worker";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { AuthType } from "../store/auth";
import { initAxiosSetup } from "../utils/auth";
import { fetchAdminProfile } from "../net/admin";
import { createContext } from "react";
import { AdminType } from "../utils/types";
import SyncPayments from "./payment/Sync";
import PaymentLogs from "./payment/Logs";
import OrderDetails from "./order/Details";
import CustomerPayments from "./payment/CustomerPayments";
import ActivityLogs from "./activity_logs/list";
import CustomerList from "./customer/List";
import ServiceList from "./service/List";
import WorkerOrders from "./worker/Orders";
import WorkerLedger from "./worker/Ledger";
import ServiceDetails from "./service/Details";
import RoleSettings from "./role/Settings";

// axios default config
initAxiosSetup();

const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/role/settings",
    element: <RoleSettings />,
  },
  {
    path: "/users",
    element: <UserList />,
  },
  {
    path: "/customers",
    element: <CustomerList />,
  },
  {
    path: "/worker/create",
    element: <CreateWorker />,
  },
  {
    path: "/worker/list",
    element: <WorkerList />,
  },
  {
    path: "/worker/:id",
    element: <WorkerProfile />,
  },
  {
    path: "/worker/:id/ledger",
    element: <WorkerLedger />,
  },
  {
    path: "/worker/:id/orders",
    element: <WorkerOrders />,
  },
  {
    path: "/payment/payable",
    element: <PaymentWorkers />,
  },
  {
    path: "/payment/sync",
    element: <SyncPayments />,
  },
  {
    path: "/payment/logs",
    element: <PaymentLogs />,
  },
  {
    path: "/payment/adjustment",
    element: <PaymentAdjustment />,
  },
  {
    path: "/order/list",
    element: <OrderList />,
  },
  {
    path: "/order/:id",
    element: <OrderDetails />,
  },
  {
    path: "/payment/transactions",
    element: <PaymentTransactions />,
  },
  {
    path: "/payment/customer",
    element: <CustomerPayments />,
  },
  {
    path: "/service/create",
    element: <CreateService />,
  },
  {
    path: "/service/list",
    element: <ServiceList />,
  },
  {
    path: "/service/:id/details",
    element: <ServiceDetails />,
  },
  {
    path: "/logs",
    element: <ActivityLogs />,
  },
];

const authRoutes = [
  {
    path: "*",
    element: <Login />,
  },
];

export type AppContextType = {
  user: AdminType | null;
};

export const AppContext = createContext<AppContextType>({
  user: null,
});

export default function App() {
  const auth = useSelector<RootState, AuthType>((state) => state.auth);
  const query = useQuery({
    queryKey: ["admin/me", auth.accessToken],
    queryFn: fetchAdminProfile,
    enabled: !!auth.accessToken,
    retry: false,
  });

  return (
    <AppContext.Provider
      value={{
        user: query.data as AdminType,
      }}
    >
      <Router>
        {query.data ? (
          <AppLayout>
            <Routes>
              {routes.map((route) => (
                <Route {...route} />
              ))}
            </Routes>
          </AppLayout>
        ) : query.isFetching && query.failureCount == 0 && query.isLoading ? (
          <div>loading...</div>
        ) : (
          <Routes>
            {authRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
          </Routes>
        )}
      </Router>
    </AppContext.Provider>
  );
}
