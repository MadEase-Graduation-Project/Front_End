import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllDoctors } from "@/services/usersApi";

export const fetchAllDoctors = createAsyncThunk(
  "doctors/fetchDoctors",
  async () => {
    return await getAllDoctors();
  }
);

const doctorSlice = createSlice({
  name: "doctors",
  initialState: {
    items: [],
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

export default doctorSlice.reducer;
