import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getAllDiseases,
  showDisease,
  addDisease,
  editDisease,
  deleteDisease,
} from "@/services/diseaseApi";
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

// Add pagination params to fetchAllDiseases
export const fetchAllDiseases = createAsyncThunk(
  "diseases/fetchAllDiseases",
  async ({ page = 1 } = {}) => {
    return await getAllDiseases({ page });
  }
);

export const fetchDiseaseById = createAsyncThunk(
  "diseases/fetchDiseaseById",
  async (id, { dispatch }) => {
    dispatch(clearSelectedDisease());
    return await showDisease(id);
  }
);

export const createDisease = createAsyncThunk(
  "diseases/createDisease",
  async ({ diseaseData }) => {
    return await addDisease(diseaseData);
  }
);

export const updateDisease = createAsyncThunk(
  "diseases/updateDisease",
  async ({ id, diseaseData }) => {
    return await editDisease(id, diseaseData);
  }
);

export const removeDisease = createAsyncThunk(
  "diseases/removeDisease",
  async (id) => {
    return await deleteDisease(id);
  }
);

const initialState = {
  // data
  diseases: [],
  selectedDisease: {},
  // counts
  totalDiseases: 0,
  // pagination
  totalPages: 1,
  currentPage: 1,
  hasMore: true,
  // loading
  loading: false,
  loadingMore: false,
  // error
  error: false,
};

const diseaseSlice = createSlice({
  name: "diseases",
  initialState,
  reducers: {
    clearSelectedDisease: (state) => {
      state.selectedDisease = {};
      state.loading = false;
      state.error = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all diseases
      .addCase(fetchAllDiseases.pending, pendingPaginationHandler())
      .addCase(
        fetchAllDiseases.fulfilled,
        fulfilledPaginationHandler({
          listKey: "diseases",
          totalsMap: {
            totalItems: "totalDiseases",
          },
        })
      )
      .addCase(fetchAllDiseases.rejected, rejectedPaginationHandler())

      // Fetch disease by ID
      .addCase(fetchDiseaseById.pending, pendingHandler())
      .addCase(
        fetchDiseaseById.fulfilled,
        fulfilledHandler({ detailsKey: "selectedDisease" })
      )
      .addCase(fetchDiseaseById.rejected, rejectedHandler())

      // Create disease
      .addCase(createDisease.pending, pendingHandler())
      .addCase(createDisease.fulfilled, fulfilledHandler())
      .addCase(createDisease.rejected, rejectedHandler())

      // Update disease
      .addCase(updateDisease.pending, pendingHandler())
      .addCase(updateDisease.fulfilled, fulfilledHandler())
      .addCase(updateDisease.rejected, rejectedHandler())

      // Remove disease
      .addCase(removeDisease.pending, pendingHandler())
      .addCase(removeDisease.fulfilled, fulfilledHandler())
      .addCase(removeDisease.rejected, rejectedHandler());
  },
});

export const { clearSelectedDisease } = diseaseSlice.actions;
export default diseaseSlice.reducer;
