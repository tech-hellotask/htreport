import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { AdminLoginResponse, AdminType } from "../utils/types";
import { LoginInputs } from "../components/user/LoginForm";
import { message } from "antd";
import { setToken } from "../utils/auth";

const initialState = {
  user: null,
  accessToken: localStorage.getItem("accessToken"),
  loading: false,
  error: null,
};

export const authLogin = createAsyncThunk(
  "auth/login",
  async (values: LoginInputs) => {
    const res = await axios.post<AdminLoginResponse>("/admin/login", values);
    return res.data;
  }
);

export const authMe = createAsyncThunk("auth/me", async () => {
  const res = await axios.get<AdminType>("/admin/me");
  return res.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authSuccess: (state, action) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      setToken(action.payload.accessToken);
    },
  },
  extraReducers: {
    [authLogin.pending.type]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [authLogin.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      setToken(action.payload.accessToken);
    },
    [authLogin.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      message.error(action.error.message);
    },
    [authMe.pending.type]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [authMe.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    [authMe.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      message.error(action.error.message);
    },
  },
});

export default authSlice.reducer;
export const { authSuccess } = authSlice.actions;

export type AuthType = ReturnType<typeof authSlice.reducer>;
