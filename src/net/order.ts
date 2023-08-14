// import { QueryOptions } from "@tanstack/react-query";
import axios from "axios";

export const fetchOrders = async () => {
  const response = await axios.get("/order/list");
  return response.data;
};
