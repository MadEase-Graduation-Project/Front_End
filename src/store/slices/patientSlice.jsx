import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllPatients } from "@/services/patientApi";
import { pendingHandler, rejectedHandler } from "@/utils/casesHandlersUtils";

export const fetchAllPatients = createAsyncThunk(
  "patients/fetchPatients",
  async () => {
    return await getAllPatients();
  }
);

const patientSlice = createSlice({
  name: "patients",
  initialState: {
    patients: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPatients.pending, pendingHandler())
      .addCase(fetchAllPatients.fulfilled, (state, action) => {
        state.patients = action.payload;
        state.loading = false;
      })
      .addCase(fetchAllPatients.rejected, rejectedHandler());
  },
});

export default patientSlice.reducer;
