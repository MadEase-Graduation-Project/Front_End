import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getAllDiseaseCategories,
  showDiseaseCategory,
  addDiseaseCategory,
  editDiseaseCategory,
  deleteDiseaseCategory,
} from "../../services/diseasesCategoriesApi";

export const fetchAllDiseasesCategories = createAsyncThunk(
  "diseasesCategories/fetchAllDiseasesCategories",
  async () => {
    return await getAllDiseaseCategories();
  }
);

export const fetchDiseaseCategoryById = createAsyncThunk(
  "diseasesCategories/fetchDiseaseCategoryById",
  async (id) => {
    return await showDiseaseCategory(id);
  }
);

export const createDiseaseCategory = createAsyncThunk(
  "diseasesCategories/createDiseaseCategory",
  async (categoryData, { dispatch }) => {
    const response = await addDiseaseCategory(categoryData);
    // Refresh the disease categories list after adding
    if (response) {
      dispatch(fetchAllDiseasesCategories());
    }
    return response;
  }
);

export const updateDiseaseCategory = createAsyncThunk(
  "diseasesCategories/updateDiseaseCategory",
  async ({ id, categoryData }, { dispatch }) => {
    const response = await editDiseaseCategory(id, categoryData);
    // Refresh the disease categories list after updating
    if (response) {
      dispatch(fetchAllDiseasesCategories());
    }
    return response;
  }
);

export const removeDiseaseCategory = createAsyncThunk(
  "diseasesCategories/removeDiseaseCategory",
  async (id, { dispatch }) => {
    const response = await deleteDiseaseCategory(id);
    // Refresh the disease categories list after deleting
    if (response) {
      dispatch(fetchAllDiseasesCategories());
    }
    return response;
  }
);

const diseaseCategorySlice = createSlice({
  name: "diseasesCategories",
  initialState: {
    items: [],
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
      // Fetch all disease categories
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

      // Fetch disease category by ID
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
      })

      // Create disease category
      .addCase(createDiseaseCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createDiseaseCategory.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createDiseaseCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Update disease category
      .addCase(updateDiseaseCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDiseaseCategory.fulfilled, (state, action) => {
        state.loading = false;
        // Update the selected disease category if it's the one being edited
        if (
          state.selectedDiseaseCategory &&
          state.selectedDiseaseCategory._id === action.payload?._id
        ) {
          state.selectedDiseaseCategory = action.payload;
        }
      })
      .addCase(updateDiseaseCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Remove disease category
      .addCase(removeDiseaseCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeDiseaseCategory.fulfilled, (state) => {
        state.loading = false;
        // Clear selected disease category if it was deleted
        state.selectedDiseaseCategory = {};
      })
      .addCase(removeDiseaseCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearSelectedDiseaseCategory } = diseaseCategorySlice.actions;
export default diseaseCategorySlice.reducer;
