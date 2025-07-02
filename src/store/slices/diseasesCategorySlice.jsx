import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getAllDiseaseCategories,
  showDiseaseCategory,
  addDiseaseCategory,
  editDiseaseCategory,
  deleteDiseaseCategory,
} from "@/services/diseasesCategoriesApi";
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

// Add pagination params to fetchAllDiseasesCategories
export const fetchAllDiseasesCategories = createAsyncThunk(
  "diseasesCategories/fetchAllDiseasesCategories",
  async ({ page = 1 } = {}) => {
    return await getAllDiseaseCategories({ page });
  }
);

export const fetchDiseaseCategoryById = createAsyncThunk(
  "diseasesCategories/fetchDiseaseCategoryById",
  async (id, { dispatch }) => {
    dispatch(clearSelectedDiseaseCategory());
    return await showDiseaseCategory(id);
  }
);

export const createDiseaseCategory = createAsyncThunk(
  "diseasesCategories/createDiseaseCategory",
  async (categoryData) => {
    return await addDiseaseCategory(categoryData);
  }
);

export const updateDiseaseCategory = createAsyncThunk(
  "diseasesCategories/updateDiseaseCategory",
  async ({ id, categoryData }) => {
    return await editDiseaseCategory(id, categoryData);
  }
);

export const removeDiseaseCategory = createAsyncThunk(
  "diseasesCategories/removeDiseaseCategory",
  async (id) => {
    return await deleteDiseaseCategory(id);
  }
);

const initialState = {
  // data
  categories: [],
  selectedDiseaseCategory: {},
  // counts
  totalDiseaseCategories: 0,
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

const diseaseCategorySlice = createSlice({
  name: "diseasesCategories",
  initialState,
  reducers: {
    clearSelectedDiseaseCategory: (state) => {
      state.selectedDiseaseCategory = {};
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all disease categories
      .addCase(fetchAllDiseasesCategories.pending, pendingPaginationHandler())
      .addCase(
        fetchAllDiseasesCategories.fulfilled,
        fulfilledPaginationHandler({
          listKey: "categories",
          totalsMap: {
            totalItems: "totalDiseaseCategories",
          },
        })
      )
      .addCase(fetchAllDiseasesCategories.rejected, rejectedPaginationHandler())

      // Fetch disease category by ID
      .addCase(fetchDiseaseCategoryById.pending, pendingHandler())
      .addCase(
        fetchDiseaseCategoryById.fulfilled,
        fulfilledHandler({ detailsKey: "selectedDiseaseCategory" })
      )
      .addCase(fetchDiseaseCategoryById.rejected, rejectedHandler())

      // Create disease category
      .addCase(createDiseaseCategory.pending, pendingHandler())
      .addCase(createDiseaseCategory.fulfilled, fulfilledHandler())
      .addCase(createDiseaseCategory.rejected, rejectedHandler())

      // Update disease category
      .addCase(updateDiseaseCategory.pending, pendingHandler())
      .addCase(updateDiseaseCategory.fulfilled, fulfilledHandler())
      .addCase(updateDiseaseCategory.rejected, rejectedHandler())

      // Remove disease category
      .addCase(removeDiseaseCategory.pending, pendingHandler())
      .addCase(removeDiseaseCategory.fulfilled, fulfilledHandler())
      .addCase(removeDiseaseCategory.rejected, rejectedHandler());
  },
});

export const { clearSelectedDiseaseCategory } = diseaseCategorySlice.actions;
export default diseaseCategorySlice.reducer;
