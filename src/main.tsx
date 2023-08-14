import React from "react";
import ReactDOM from "react-dom/client";
import App from "./pages/App.tsx";
import { Provider } from "react-redux";
import "./index.scss";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import store from "./store/index.ts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);
