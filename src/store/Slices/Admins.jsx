import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllAdmins } from "../../services/UsersApi";

export const fetchAllAdmins = createAsyncThunk(
  "admins/fetchAdmins",
  async (token) => {
    return await getAllAdmins(token);
  }
);

const AdminsSlice = createSlice({
  name: "admins",
  initialState: {
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

export default AdminsSlice.reducer;
