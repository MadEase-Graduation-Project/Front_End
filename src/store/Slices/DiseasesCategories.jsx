import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getAllDiseaseCategories,
  showDiseaseCategory,
} from "../../services/DiseasesCategoriesApi";

export const fetchAllDiseasesCategories = createAsyncThunk(
  "diseasesCategories/fetchAllDiseasesCategories",
  async (token) => {
    return await getAllDiseaseCategories(token);
  }
);

export const fetchDiseaseCategoryById = createAsyncThunk(
  "diseasesCategories/fetchDiseaseCategoryById",
  async ({ id, token }) => {
    return await showDiseaseCategory(id, token);
  }
);

const diseasesCategoriesSlice = createSlice({
  name: "diseasesCategories",
  initialState: {
    selectedDiseaseCategory: {},
    loading: false,
    error: null,
  },
  reducers: {
    clearSelectedDiseaseCategory: (state) => {
      state.selectedDiseaseCategory = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllDiseasesCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllDiseasesCategories.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchAllDiseasesCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchDiseaseCategoryById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDiseaseCategoryById.fulfilled, (state, action) => {
        state.selectedDiseaseCategory = action.payload;
        state.loading = false;
      })
      .addCase(fetchDiseaseCategoryById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearSelectedDiseaseCategory } = diseasesCategoriesSlice.actions;
export default diseasesCategoriesSlice.reducer;
