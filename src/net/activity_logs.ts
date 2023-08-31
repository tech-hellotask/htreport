import { QueryOptions } from "@tanstack/react-query";
import axios from "axios";

export const getActivityLogs = async ({ queryKey: [path] }: QueryOptions) => {
  const response = await axios.get(path as string);
  return response.data;
};

export const getActivityLog = async ({ queryKey: [path] }: QueryOptions) => {
  const response = await axios.get(path as string);
  return response.data;
};
