import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllHospitals, showHospital } from "../../services/hospitalApi";
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

// Thunks
export const fetchHospitals = createAsyncThunk(
  "hospital/fetchHospitals",
  async ({ page = 1 } = {}) => {
    return await getAllHospitals({ page });
  }
);

export const fetchHospitalByName = createAsyncThunk(
  "hospital/fetchHospitalByName",
  async ({ name } = {}, { dispatch }) => {
    dispatch(resetHospitalState());
    return await showHospital({ name });
  }
);

const initialState = {
  // data
  hospitals: [],
  hospital: {},
  // counts
  totalHospitals: 0,
  // pagination
  currentPage: 1,
  totalPages: 1,
  hasMore: true,
  // loading
  loading: false,
  loadingMore: false,
  // error
  error: null,
};

const hospitalSlice = createSlice({
  name: "hospital",
  initialState,
  reducers: {
    resetHospitalState: (state) => {
      state.hospital = {};
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetch hospitals
      .addCase(fetchHospitals.pending, pendingPaginationHandler())
      .addCase(
        fetchHospitals.fulfilled,
        fulfilledPaginationHandler({
          listKey: "hospitals",
          totalsMap: {
            totalItems: "totalHospitals",
          },
        })
      )
      .addCase(fetchHospitals.rejected, rejectedPaginationHandler())
      // fetchHospitalByName
      .addCase(fetchHospitalByName.pending, pendingHandler())
      .addCase(
        fetchHospitalByName.fulfilled,
        fulfilledHandler({ detailsKey: "hospital" })
      )
      .addCase(fetchHospitalByName.rejected, rejectedHandler());
  },
});

export const { resetHospitalState } = hospitalSlice.actions;
export default hospitalSlice.reducer;
