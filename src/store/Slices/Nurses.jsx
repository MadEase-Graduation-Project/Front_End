import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllNurses } from "../../services/UsersApi";

export const fetchAllNurses = createAsyncThunk(
  "nurses/fetchNurses",
  async (token) => {
    return await getAllNurses(token);
  }
);

const nursesSlice = createSlice({
  name: "nurses",
  initialState: {
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllNurses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllNurses.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchAllNurses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default nursesSlice.reducer;
