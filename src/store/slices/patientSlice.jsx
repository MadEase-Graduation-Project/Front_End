import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllPatients } from "@/services/usersApi";

export const fetchAllPatients = createAsyncThunk(
  "patients/fetchPatients",
  async () => {
    return await getAllPatients();
  }
);

const patientSlice = createSlice({
  name: "patients",
  initialState: {
    items: [],
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

export default patientSlice.reducer;
