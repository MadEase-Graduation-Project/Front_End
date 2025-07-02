import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllAdmins } from "@/services/adminApi";

export const fetchAllAdmins = createAsyncThunk(
  "admins/fetchAdmins",
  async () => {
    return await getAllAdmins();
  }
);

const initialState = {
  admins: [],
  loading: false,
  error: null,
};

//* note that here we take the data of admins direct from payload

const adminSlice = createSlice({
  name: "admins",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllAdmins.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllAdmins.fulfilled, (state, action) => {
        state.admins = action.payload;
        state.loading = false;
      })
      .addCase(fetchAllAdmins.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default adminSlice.reducer;
