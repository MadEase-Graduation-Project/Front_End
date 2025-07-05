import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getAllDiagnosis,
  getDiagnosisById,
  addDiagnosis,
  updateDiagnosis,
  deleteDiagnosis,
} from "@/services/diagnosisApi";
import {
  fulfilledPaginationHandler,
  pendingPaginationHandler,
  rejectedPaginationHandler,
} from "@/utils/paginationCasesHandlersUtils";
import {
  fulfilledHandler,
  pendingHandler,
  rejectedHandler,
} from "@/utils/casesHandlersUtils";

// Thunks with pagination support
export const fetchAllDiagnosis = createAsyncThunk(
  "diagnosis/fetchAllDiagnosis",
  async ({ page = 1 } = {}) => {
    return await getAllDiagnosis({ page });
  }
);

export const fetchDiagnosisById = createAsyncThunk(
  "diagnosis/fetchDiagnosisById",
  async (id, { dispatch }) => {
    dispatch(clearSelectedDiagnosis());
    return await getDiagnosisById(id);
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
  async ({ id, diagnosisData }) => {
    return await updateDiagnosis(id, diagnosisData);
  }
);

export const removeDiagnosis = createAsyncThunk(
  "diagnosis/removeDiagnosis",
  async (id) => {
    return await deleteDiagnosis(id);
  }
);

const initialState = {
  diagnosis: [],
  selectedDiagnosis: {},
  totalDiagnosis: 0,
  totalPages: 1,
  currentPage: 1,
  hasMore: true,
  loading: false,
  loadingMore: false,
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
      .addCase(fetchAllDiagnosis.pending, pendingPaginationHandler())
      .addCase(
        fetchAllDiagnosis.fulfilled,
        fulfilledPaginationHandler({
          listKey: "diagnosis",
          totalsMap: {
            totalItems: "totalDiagnosis",
          },
        })
      )
      .addCase(fetchAllDiagnosis.rejected, rejectedPaginationHandler())

      // Fetch diagnosis by ID
      .addCase(fetchDiagnosisById.pending, pendingHandler())
      .addCase(
        fetchDiagnosisById.fulfilled,
        fulfilledHandler({ detailsKey: "selectedDiagnosis" })
      )
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
      .addCase(removeDiagnosis.fulfilled, fulfilledHandler())
      .addCase(removeDiagnosis.rejected, rejectedHandler());
  },
});

export const { clearSelectedDiagnosis } = diagnosisSlice.actions;
export default diagnosisSlice.reducer;
