import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllDoctors } from "../../services/UsersApi";

export const fetchAllDoctors = createAsyncThunk(
  "doctors/fetchDoctors",
  async (token) => {
    return await getAllDoctors(token);
  }
);

const doctorsSlice = createSlice({
  name: "doctors",
  initialState: {
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllDoctors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllDoctors.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchAllDoctors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default doctorsSlice.reducer;
