import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllNurses } from "../../services/usersApi";

export const fetchAllNurses = createAsyncThunk(
  "nurses/fetchNurses",
  async () => {
    return await getAllNurses();
  }
);

const nurseSlice = createSlice({
  name: "nurses",
  initialState: {
    items: [],
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

export default nurseSlice.reducer;
