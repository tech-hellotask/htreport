import axios from "axios";

export const balanceReport = async () => {
  const response = await axios.get("/report/balance");
  return response.data;
};
