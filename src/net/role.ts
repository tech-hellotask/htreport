import axios from "axios";

import { RoleInputs } from "../components/user/CreateRole";
import { QueryOptions } from "@tanstack/react-query";
import { RoleComponentInputs } from "../pages/role/CreateComponent";
import { RoleAccessInputs } from "../pages/role/CreateAccess";

export const fetchRoles = async () => {
  const response = await axios.get("/role/list");
  return response.data;
};

export const createRole = async (values: RoleInputs) => {
  const response = await axios.post("/role", values);
  return response.data;
};

export const getRoleComponents = async ({ queryKey: [path] }: QueryOptions) => {
  const { data } = await axios.get(path as string);
  return data;
};

export const createRoleComponent = async (values: RoleComponentInputs) => {
  const response = await axios.post("/role/component", values);
  return response.data;
};

export const createRoleAccess = async (values: RoleAccessInputs) => {
  const response = await axios.post("/role/access", values);
  return response.data;
};

export const deleteRoleAccess = async (id: number) => {
  const response = await axios.delete(`/role/access/${id}`);
  return response.data;
};
