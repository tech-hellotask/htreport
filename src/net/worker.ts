import { QueryOptions } from "@tanstack/react-query";
import axios from "axios";

export const getWorkerById = async ({ queryKey }: QueryOptions) => {
  const response = await axios.get(queryKey[0] as string);
  return response.data;
};

export const getWorkerLedgerById = async ({ queryKey }: QueryOptions) => {
  const response = await axios.get(queryKey[0] as string);
  return response.data;
};

export const searchWorker = async ({ queryKey }: QueryOptions) => {
  const path = queryKey[0] as string;
  const value = queryKey[1] as {
    by: string;
    value: string;
  };
  if (!value.value) {
    return [];
  }
  const response = await axios.get(`${path}?${value.by}=${value.value}`);
  return response.data;
};

export const fetchWorkerList = async ({ queryKey: [path] }: QueryOptions) => {
  const response = await axios.get(path as string);
  return response.data;
};

export const fetchWorkerOrders = async ({ queryKey: [path] }: QueryOptions) => {
  const response = await axios.get(path as string);
  return response.data;
};
