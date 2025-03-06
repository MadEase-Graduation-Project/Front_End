import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllTreatments, showTreatment } from "../../services/TreatmentsApi";

export const fetchAllTreatments = createAsyncThunk(
  "treatments/fetchAllTreatments",
  async (token) => {
    return await getAllTreatments(token);
  }
);

export const fetchTreatmentById = createAsyncThunk(
  "treatments/fetchTreatmentById",
  async ({ id, token }) => {
    return await showTreatment(id, token);
  }
);

const treatmentsSlice = createSlice({
  name: "treatments",
  initialState: {
    selectedTreatment: {},
    loading: false,
    error: null,
  },
  reducers: {
    clearSelectedTreatment: (state) => {
      state.selectedTreatment = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllTreatments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllTreatments.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchAllTreatments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchTreatmentById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTreatmentById.fulfilled, (state, action) => {
        state.selectedTreatment = action.payload;
        state.loading = false;
      })
      .addCase(fetchTreatmentById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearSelectedTreatment } = treatmentsSlice.actions;
export default treatmentsSlice.reducer;
