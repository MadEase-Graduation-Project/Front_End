import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getAllPatients,
  showPatients,
  showPatientById,
} from "@/services/patientApi";
import { pendingHandler, rejectedHandler } from "@/utils/casesHandlersUtils";

export const fetchAllPatients = createAsyncThunk(
  "patients/fetchPatients",
  async () => {
    return await getAllPatients();
  }
);

// Fetch all patients (basic data for doctors and nurses)
export const fetchShowPatients = createAsyncThunk(
  "patients/showPatients",
  async () => {
    return await showPatients();
  }
);

// Fetch one patient by id
export const fetchShowPatientById = createAsyncThunk(
  "patients/showPatientById",
  async (id, { dispatch }) => {
    dispatch(clearSelectedPatient());
    return await showPatientById(id);
  }
);

const initialState = {
  patients: [],
  showPatients: [],
  selectedPatient: null,
  // handling
  loading: false,
  error: false,
};

const patientSlice = createSlice({
  name: "patients",
  initialState,
  reducers: {
    clearSelectedPatient: (state) => {
      state.selectedPatient = null;
      state.loading = false;
      state.error = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPatients.pending, pendingHandler())
      .addCase(fetchAllPatients.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.patients = action.payload;
      })
      .addCase(fetchAllPatients.rejected, rejectedHandler())

      // showPatients
      .addCase(fetchShowPatients.pending, pendingHandler())
      .addCase(fetchShowPatients.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.showPatients = action.payload?.patients;
      })
      .addCase(fetchShowPatients.rejected, rejectedHandler())

      // showPatientById
      .addCase(fetchShowPatientById.pending, pendingHandler())
      .addCase(fetchShowPatientById.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.selectedPatient = action.payload;
      })
      .addCase(fetchShowPatientById.rejected, rejectedHandler());
  },
});

export const { clearSelectedPatient } = patientSlice.actions;
export default patientSlice.reducer;
