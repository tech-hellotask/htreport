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
