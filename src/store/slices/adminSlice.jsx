import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllAdmins } from "@/services/usersApi";

export const fetchAllAdmins = createAsyncThunk(
  "admins/fetchAdmins",
  async () => {
    return await getAllAdmins();
  }
);

const adminSlice = createSlice({
  name: "admins",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllAdmins.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllAdmins.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchAllAdmins.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default adminSlice.reducer;
