import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllAdmins } from "@/services/adminApi";
import { pendingHandler, rejectedHandler } from "@/utils/casesHandlersUtils";

export const fetchAllAdmins = createAsyncThunk(
  "admins/fetchAdmins",
  async () => {
    return await getAllAdmins();
  }
);

const initialState = {
  admins: [],
  loading: false,
  error: false,
};

//* note that here we take the data of admins direct from payload

const adminSlice = createSlice({
  name: "admins",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllAdmins.pending, pendingHandler())
      .addCase(fetchAllAdmins.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.admins = action.payload;
      })
      .addCase(fetchAllAdmins.rejected, rejectedHandler());
  },
});

export default adminSlice.reducer;
