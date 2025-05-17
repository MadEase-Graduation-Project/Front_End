import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getAllDiseases,
  showDisease,
  addDisease,
  editDisease,
  deleteDisease,
} from "@/services/diseasesApi";

export const fetchAllDiseases = createAsyncThunk(
  "diseases/fetchAllDiseases",
  async () => {
    return await getAllDiseases();
  }
);

export const fetchDiseaseById = createAsyncThunk(
  "diseases/fetchDiseaseById",
  async (id) => {
    return await showDisease(id);
  }
);

export const createDisease = createAsyncThunk(
  "diseases/createDisease",
  async ({ diseaseData }, { dispatch }) => {
    const response = await addDisease(diseaseData);
    // Refresh the diseases list after adding
    if (response) {
      dispatch(fetchAllDiseases());
    }
    return response;
  }
);

export const updateDisease = createAsyncThunk(
  "diseases/updateDisease",
  async ({ id, diseaseData }, { dispatch }) => {
    const response = await editDisease(id, diseaseData);
    // Refresh the diseases list after updating
    if (response) {
      dispatch(fetchAllDiseases());
    }
    return response;
  }
);

export const removeDisease = createAsyncThunk(
  "diseases/removeDisease",
  async (id, { dispatch }) => {
    const response = await deleteDisease(id);
    // Refresh the diseases list after deleting
    if (response) {
      dispatch(fetchAllDiseases());
    }
    return response;
  }
);

const diseaseSlice = createSlice({
  name: "diseases",
  initialState: {
    items: [],
    selectedDisease: {},
    loading: false,
    error: null,
  },
  reducers: {
    clearSelectedDisease: (state) => {
      state.selectedDisease = {};
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all diseases
      .addCase(fetchAllDiseases.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllDiseases.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchAllDiseases.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Fetch disease by ID
      .addCase(fetchDiseaseById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDiseaseById.fulfilled, (state, action) => {
        state.selectedDisease = action.payload;
        state.loading = false;
      })
      .addCase(fetchDiseaseById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Create disease
      .addCase(createDisease.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createDisease.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createDisease.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Update disease
      .addCase(updateDisease.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDisease.fulfilled, (state, action) => {
        state.loading = false;
        // Update the selected disease if it's the one being edited
        if (
          state.selectedDisease &&
          state.selectedDisease._id === action.payload?._id
        ) {
          state.selectedDisease = action.payload;
        }
      })
      .addCase(updateDisease.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Remove disease
      .addCase(removeDisease.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeDisease.fulfilled, (state) => {
        state.loading = false;
        // Clear selected disease if it was deleted
        state.selectedDisease = {};
      })
      .addCase(removeDisease.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearSelectedDisease } = diseaseSlice.actions;
export default diseaseSlice.reducer;
