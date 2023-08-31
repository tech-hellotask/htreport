import axios from "axios";
import { UserInputs } from "../components/user/Registration";
import { RoleInputs } from "../components/user/CreateRole";
import { LoginInputs } from "../components/user/LoginForm";

export const loginAuth = async (values: LoginInputs) => {
  const res = await axios.post("/admin/login", values);
  return res.data;
};

export const fetchRoles = async () => {
  const response = await axios.get("/role/list");
  return response.data;
};

export const createRole = async (values: RoleInputs) => {
  const response = await axios.post("/role", values);
  return response.data;
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
