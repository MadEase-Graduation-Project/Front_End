import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllNurses } from "@/services/nurseApi";
import { pendingHandler, rejectedHandler } from "@/utils/casesHandlersUtils";

export const fetchAllNurses = createAsyncThunk(
  "nurses/fetchNurses",
  async () => {
    return await getAllNurses();
  }
);

const nurseSlice = createSlice({
  name: "nurses",
  initialState: {
    nurses: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllNurses.pending, pendingHandler())
      .addCase(fetchAllNurses.fulfilled, (state, action) => {
        state.nurses = action.payload;
        state.loading = false;
      })
      .addCase(fetchAllNurses.rejected, rejectedHandler());
  },
});

export default nurseSlice.reducer;
