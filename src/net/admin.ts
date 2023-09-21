import axios from "axios";
import { UserInputs } from "../components/user/Registration";
import { LoginInputs } from "../components/user/LoginForm";

export const loginAuth = async (values: LoginInputs) => {
  const res = await axios.post("/admin/login", values);
  return res.data;
};

export const fetchAdminList = async () => {
  const response = await axios.get("/admin/list");
  return response.data;
};

export const fetchAdminProfile = async () => {
  const response = await axios.get("/admin/me");
  return response.data;
};

export const createAdmin = async (values: UserInputs) => {
  const response = await axios.post("/admin", values);
  return response.data;
};
