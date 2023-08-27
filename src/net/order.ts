// import { QueryOptions } from "@tanstack/react-query";
import { QueryOptions } from "@tanstack/react-query";
import axios from "axios";

export const fetchOrders = async ({ queryKey: [path] }: QueryOptions) => {
  const response = await axios.get(path as string);
  return response.data;
};

export const migrateOrders = async (date: string) => {
  const response = await axios.get(`/migrate/orders?date=${date}`, {
    headers: {
      "x-master-key": "12345678901234567890123456789012",
    },
  });
  return response.data;
};
