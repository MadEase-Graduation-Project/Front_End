import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllDiseases, showDisease } from "../../services/DiseasesApi";

export const fetchAllDiseases = createAsyncThunk(
  "diseases/fetchAllDiseases",
  async (token) => {
    return await getAllDiseases(token);
  }
);

export const fetchDiseaseById = createAsyncThunk(
  "diseases/fetchDiseaseById",
  async ({ id, token }) => {
    return await showDisease(id, token);
  }
);

const diseasesSlice = createSlice({
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
      });
  },
});

export const { clearSelectedDisease } = diseasesSlice.actions;
export default diseasesSlice.reducer;
