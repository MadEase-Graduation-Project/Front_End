import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getAllTreatments,
  showTreatment,
  addTreatment,
  editTreatment,
  deleteTreatment,
} from "@/services/treatmentsApi";

export const fetchAllTreatments = createAsyncThunk(
  "treatments/fetchAllTreatments",
  async () => {
    return await getAllTreatments();
  }
);

export const fetchTreatmentById = createAsyncThunk(
  "treatments/fetchTreatmentById",
  async (id) => {
    return await showTreatment(id);
  }
);

export const createTreatment = createAsyncThunk(
  "treatments/createTreatment",
  async (treatmentData, { dispatch }) => {
    const response = await addTreatment(treatmentData);
    // Refresh the treatments list after adding
    if (response) {
      dispatch(fetchAllTreatments());
    }
    return response;
  }
);

export const updateTreatment = createAsyncThunk(
  "treatments/updateTreatment",
  async ({ id, treatmentData }, { dispatch }) => {
    const response = await editTreatment(id, treatmentData);
    // Refresh the treatments list after updating
    if (response) {
      dispatch(fetchAllTreatments());
    }
    return response;
  }
);

export const removeTreatment = createAsyncThunk(
  "treatments/removeTreatment",
  async (id, { dispatch }) => {
    const response = await deleteTreatment(id);
    // Refresh the treatments list after deleting
    if (response) {
      dispatch(fetchAllTreatments());
    }
    return response;
  }
);

const treatmentSlice = createSlice({
  name: "treatments",
  initialState: {
    items: [],
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
      // Fetch all treatments
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

      // Fetch treatment by ID
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
      })

      // Create treatment
      .addCase(createTreatment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTreatment.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createTreatment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Update treatment
      .addCase(updateTreatment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTreatment.fulfilled, (state, action) => {
        state.loading = false;
        // Update the selected treatment if it's the one being edited
        if (
          state.selectedTreatment &&
          state.selectedTreatment._id === action.payload?._id
        ) {
          state.selectedTreatment = action.payload;
        }
      })
      .addCase(updateTreatment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Remove treatment
      .addCase(removeTreatment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeTreatment.fulfilled, (state) => {
        state.loading = false;
        // Clear selected treatment if it was deleted
        state.selectedTreatment = {};
      })
      .addCase(removeTreatment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearSelectedTreatment } = treatmentSlice.actions;
export default treatmentSlice.reducer;
