import axios from "axios";

export const initAxiosSetup = () => {
  const token = localStorage.getItem("accessToken");
  setToken(token);
  axios.defaults.baseURL =
    import.meta.env.VITE_GO_SERVER_URL || "http://localhost:3000";
};

export const setToken = (token: string | undefined) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    localStorage.setItem("accessToken", token);
  }
};

export const removeToken = () => {
  axios.defaults.headers.common["Authorization"] = undefined;
  localStorage.removeItem("accessToken");
};
