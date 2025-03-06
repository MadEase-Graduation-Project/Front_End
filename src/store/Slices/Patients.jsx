import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllPatients } from "../../services/UsersApi";

export const fetchAllPatients = createAsyncThunk(
  "patients/fetchPatients",
  async (token) => {
    return await getAllPatients(token);
  }
);

const patientsSlice = createSlice({
  name: "patients",
  initialState: {
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPatients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllPatients.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchAllPatients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default patientsSlice.reducer;
