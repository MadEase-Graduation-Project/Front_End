import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getAllAdvices,
  showAdvice,
  addAdvice,
  editAdvice,
  deleteAdvice,
} from "../../services/AdvicesApi";

export const fetchAllAdvices = createAsyncThunk(
  "advices/fetchAllAdvices",
  async () => {
    return await getAllAdvices();
  }
);

export const fetchAdviceById = createAsyncThunk(
  "advices/fetchAdviceById",
  async (id) => {
    return await showAdvice(id);
  }
);

export const createAdvice = createAsyncThunk(
  "advices/createAdvice",
  async ({ adviceData }, { dispatch }) => {
    const response = await addAdvice(adviceData);
    // Refresh the advices list after adding
    if (response) {
      dispatch(fetchAllAdvices());
    }
    return response;
  }
);

export const updateAdvice = createAsyncThunk(
  "advices/updateAdvice",
  async ({ id, adviceData }, { dispatch }) => {
    const response = await editAdvice(id, adviceData);
    // Refresh the advices list after updating
    if (response) {
      dispatch(fetchAllAdvices());
    }
    return response;
  }
);

export const removeAdvice = createAsyncThunk(
  "advices/removeAdvice",
  async ({ id }, { dispatch }) => {
    const response = await deleteAdvice(id);
    // Refresh the advices list after deleting
    if (response) {
      dispatch(fetchAllAdvices());
    }
    return response;
  }
);

const advicesSlice = createSlice({
  name: "advices",
  initialState: {
    items: [],
    selectedAdvice: {},
    loading: false,
    error: null,
  },
  reducers: {
    clearSelectedAdvice: (state) => {
      state.selectedAdvice = {};
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all advices
      .addCase(fetchAllAdvices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllAdvices.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchAllAdvices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Fetch advice by ID
      .addCase(fetchAdviceById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdviceById.fulfilled, (state, action) => {
        state.selectedAdvice = action.payload;
        state.loading = false;
      })
      .addCase(fetchAdviceById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Create advice
      .addCase(createAdvice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAdvice.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createAdvice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Update advice
      .addCase(updateAdvice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAdvice.fulfilled, (state, action) => {
        state.loading = false;
        // Update the selected advice if it's the one being edited
        if (
          state.selectedAdvice &&
          state.selectedAdvice._id === action.payload?._id
        ) {
          state.selectedAdvice = action.payload;
        }
      })
      .addCase(updateAdvice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Remove advice
      .addCase(removeAdvice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeAdvice.fulfilled, (state) => {
        state.loading = false;
        // Clear selected advice if it was deleted
        state.selectedAdvice = {};
      })
      .addCase(removeAdvice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearSelectedAdvice } = advicesSlice.actions;
export default advicesSlice.reducer;
