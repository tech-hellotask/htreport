import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  searchWorker: {
    data: [],
    loading: false,
    error: null,
  },
};

export const searchWorker = createAsyncThunk(
  "worker/search",
  async (value: { by: string; value: string }) => {
    if (!value.value) {
      return [];
    }

    if (!value.by) {
      value.by = "name";
    }

    const res = await axios.get(`/worker/search?${value.by}=${value.value}`);
    return res.data;
  }
);

const workerSlice = createSlice({
  name: "worker",
  initialState,
  reducers: {},
  extraReducers: {
    [searchWorker.pending.type]: (state) => {
      state.searchWorker.loading = true;
      state.searchWorker.error = null;
    },
    [searchWorker.fulfilled.type]: (state, action) => {
      state.searchWorker.loading = false;
      state.searchWorker.data = action.payload;
    },
    [searchWorker.rejected.type]: (state, action) => {
      state.searchWorker.loading = false;
      state.searchWorker.error = action.error.message;
    },
  },
});

export default workerSlice.reducer;
export type WorkerStoreType = ReturnType<typeof workerSlice.reducer>;
export type WorkerSearchType = WorkerStoreType["searchWorker"];
