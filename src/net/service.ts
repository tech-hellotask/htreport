import { QueryOptions } from "@tanstack/react-query";
import axios from "axios";

export const getServices = async ({ queryKey: [path] }: QueryOptions) => {
  const { data } = await axios.get(path as string);
  return data;
};
