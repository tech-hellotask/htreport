import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import authSlice from "./auth";
import workerSlice from "./worker";

const store = configureStore({
  reducer: {
    auth: authSlice,
    worker: workerSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
export type RootState = ReturnType<typeof store.getState>;
