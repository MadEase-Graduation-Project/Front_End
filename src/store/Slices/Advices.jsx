import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllAdvices, showAdvice } from "../../services/AdvicesApi";

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

const advicesSlice = createSlice({
  name: "advices",
  initialState: {
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
      });
  },
});

export const { clearSelectedAdvice } = advicesSlice.actions;
export default advicesSlice.reducer;
