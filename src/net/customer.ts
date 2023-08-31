import { QueryOptions } from "@tanstack/react-query";
import axios from "axios";

export const getCustomers = async ({ queryKey: [path] }: QueryOptions) => {
  const { data } = await axios.get(path as string);
  return data;
};
