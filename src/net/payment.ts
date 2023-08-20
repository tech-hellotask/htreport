import { QueryOptions } from "@tanstack/react-query";
import axios from "axios";
import { CreateAdjustmentInputs } from "../components/payment/adjustment/create";

export const fetchBonus = async () => {
  const response = await axios.get("/bonus/list");
  return response.data;
};

export const fetchTransactions = async () => {
  const response = await axios.get("/transaction/list");
  return response.data;
};

export const transactionDetailsFromFile = async (data: FormData) => {
  const response = await axios.post("/transaction/details", data);
  return response.data;
};

export const createTransactionFromFile = async (data: FormData) => {
  const response = await axios.post("/transaction/file", data);
  return response.data;
};

export const fetchAdjustments = async ({ queryKey: [path] }: QueryOptions) => {
  const response = await axios.get(path as string);
  return response.data;
};

export const createAdjustment = async (data: CreateAdjustmentInputs) => {
  const response = await axios.post("/adjustment", data);
  return response.data;
};

export const fetchWorkerPayments = async ({
  queryKey: [path],
}: QueryOptions) => {
  const response = await axios.get(path as string);
  return response.data;
};

export const downloadWorkerPayments = async (account: string) => {
  const response = await axios.get(
    `/worker/payable-accounts?account=${account}`,
    {
      responseType: "arraybuffer",
    }
  );

  const url = URL.createObjectURL(
    new Blob([response.data], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    })
  );

  // Create a new anchor element
  const a = document.createElement("a");
  a.href = url;
  a.download = `worker-payments-${account}.xlsx`;
  a.click();
};
