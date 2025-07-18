import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getAllDiagnosis,
  getDiagnosisById,
  addDiagnosis,
  updateDiagnosis,
  deleteDiagnosis,
} from "@/services/diagnosisApi";

import {
  fulfilledHandler,
  pendingHandler,
  rejectedHandler,
} from "@/utils/casesHandlersUtils";

// Thunks with pagination support
export const fetchAllDiagnosis = createAsyncThunk(
  "diagnosis/fetchAllDiagnosis",
  async (patient_id) => {
    return await getAllDiagnosis(patient_id);
  }
);

export const fetchDiagnosisById = createAsyncThunk(
  "diagnosis/fetchDiagnosisById",
  async (patient_id, diagnosis_id, { dispatch }) => {
    dispatch(clearSelectedDiagnosis());
    return await getDiagnosisById(patient_id, diagnosis_id);
  }
);

export const createDiagnosis = createAsyncThunk(
  "diagnosis/createDiagnosis",
  async (diagnosisData) => {
    return await addDiagnosis(diagnosisData);
  }
);

export const editDiagnosis = createAsyncThunk(
  "diagnosis/editDiagnosis",
  async (patient_id, diagnose_id, diagnosisData, { dispatch }) => {
    await updateDiagnosis(patient_id, diagnose_id, diagnosisData);
    dispatch(fetchDiagnosisById(patient_id, diagnose_id));
  }
);

export const removeDiagnosis = createAsyncThunk(
  "diagnosis/removeDiagnosis",
  async (diagnose_id) => {
    await deleteDiagnosis(diagnose_id);
    return diagnose_id;
  }
);

const initialState = {
  diagnosis: [],
  selectedDiagnosis: {},
  totalDiagnosis: 0,

  loading: false,

  error: false,
};

const diagnosisSlice = createSlice({
  name: "diagnosis",
  initialState,
  reducers: {
    clearSelectedDiagnosis: (state) => {
      state.selectedDiagnosis = {};
      state.loading = false;
      state.error = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all diagnosis
      .addCase(fetchAllDiagnosis.pending, pendingHandler())
      .addCase(fetchAllDiagnosis.fulfilled, (state, action) => {
        (state.loading = false),
          (state.error = false),
          (state.diagnosis = action.payload?.diagnoses);
        state.totalDiagnosis = action.payload?.totalDiagnoses;
      })
      .addCase(fetchAllDiagnosis.rejected, rejectedHandler())

      // Fetch diagnosis by ID
      .addCase(fetchDiagnosisById.pending, pendingHandler())
      .addCase(fetchDiagnosisById.fulfilled, (state, action) => {
        (state.loading = false),
          (state.error = false),
          (state.selectedDiagnosis = action.payload?.diagnosis);
      })
      .addCase(fetchDiagnosisById.rejected, rejectedHandler())

      // Create diagnosis
      .addCase(createDiagnosis.pending, pendingHandler())
      .addCase(createDiagnosis.fulfilled, fulfilledHandler())
      .addCase(createDiagnosis.rejected, rejectedHandler())

      // Edit diagnosis
      .addCase(editDiagnosis.pending, pendingHandler())
      .addCase(editDiagnosis.fulfilled, fulfilledHandler())
      .addCase(editDiagnosis.rejected, rejectedHandler())

      // Remove diagnosis
      .addCase(removeDiagnosis.pending, pendingHandler())
      .addCase(removeDiagnosis.fulfilled, (state, action) => {
        (state.loading = false),
          (state.error = false),
          (state.diagnosis = state.diagnosis.filter(
            (diagnosis) => diagnosis._id !== action.payload
          ));
        if (state.selectedDiagnosis?._id === action.payload) {
          state.selectedDiagnosis = {};
        }
      })
      .addCase(removeDiagnosis.rejected, rejectedHandler());
  },
});

export const { clearSelectedDiagnosis } = diagnosisSlice.actions;
export default diagnosisSlice.reducer;
