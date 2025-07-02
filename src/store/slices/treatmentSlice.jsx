import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getAllTreatments,
  showTreatment,
  addTreatment,
  editTreatment,
  deleteTreatment,
} from "@/services/treatmentsApi";
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

export const fetchAllTreatments = createAsyncThunk(
  "treatments/fetchAllTreatments",
  async ({ page = 1 } = {}) => {
    return await getAllTreatments({ page });
  }
);

export const fetchTreatmentById = createAsyncThunk(
  "treatments/fetchTreatmentById",
  async (id, { dispatch }) => {
    dispatch(clearSelectedTreatment());
    return await showTreatment(id);
  }
);

export const createTreatment = createAsyncThunk(
  "treatments/createTreatment",
  async (treatmentData) => {
    return await addTreatment(treatmentData);
  }
);

export const updateTreatment = createAsyncThunk(
  "treatments/updateTreatment",
  async ({ id, treatmentData }) => {
    return await editTreatment(id, treatmentData);
  }
);

export const removeTreatment = createAsyncThunk(
  "treatments/removeTreatment",
  async (id) => {
    return await deleteTreatment(id);
  }
);

const initialState = {
  // data
  treatments: [],
  selectedTreatment: {},
  // counts
  totalTreatments: 0,
  // pagination
  totalPages: 1,
  currentPage: 1,
  hasMore: true,
  // loading
  loading: false,
  loadingMore: false,
  // error
  error: null,
};

const treatmentSlice = createSlice({
  name: "treatments",
  initialState,
  reducers: {
    clearSelectedTreatment: (state) => {
      state.selectedTreatment = {};
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all treatments
      .addCase(fetchAllTreatments.pending, pendingPaginationHandler())
      .addCase(
        fetchAllTreatments.fulfilled,
        fulfilledPaginationHandler({
          listKey: "treatments",
          totalsMap: {
            totalItems: "totalTreatments",
          },
        })
      )
      .addCase(fetchAllTreatments.rejected, rejectedPaginationHandler())

      // Fetch treatment by ID
      .addCase(fetchTreatmentById.pending, pendingHandler())
      .addCase(
        fetchTreatmentById.fulfilled,
        fulfilledHandler({ detailsKey: "selectedTreatment" })
      )
      .addCase(fetchTreatmentById.rejected, rejectedHandler())

      // Create treatment
      .addCase(createTreatment.pending, pendingHandler())
      .addCase(createTreatment.fulfilled, fulfilledHandler())
      .addCase(createTreatment.rejected, rejectedHandler())

      // Update treatment
      .addCase(updateTreatment.pending, pendingHandler())
      .addCase(updateTreatment.fulfilled, fulfilledHandler())
      .addCase(updateTreatment.rejected, rejectedHandler())

      // Remove treatment
      .addCase(removeTreatment.pending, pendingHandler())
      .addCase(removeTreatment.fulfilled, fulfilledHandler())
      .addCase(removeTreatment.rejected, rejectedHandler());
  },
});

export const { clearSelectedTreatment } = treatmentSlice.actions;
export default treatmentSlice.reducer;
