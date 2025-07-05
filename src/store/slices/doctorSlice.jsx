import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getAllDoctors,
  getAllDoctorsPublic,
  showDoctorDetails,
} from "@/services/doctorApi";
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

// first two fetches need validation
export const fetchAllDoctors = createAsyncThunk(
  "doctors/fetchDoctors",
  async () => {
    return await getAllDoctors();
  }
);

export const fetchDoctorDetails = createAsyncThunk(
  "doctors/fetchDoctorDetails",
  async ({ name }, { dispatch }) => {
    dispatch(clearSelectedDoctor());
    return await showDoctorDetails({ name });
  }
);

// public fetches don't need validation
export const fetchPublicDoctors = createAsyncThunk(
  "doctors/fetchDoctorsPublic",
  async ({ page = 1 }) => {
    return await getAllDoctorsPublic({ page });
  }
);

const initialState = {
  // first two fetches need validation
  doctors: [],
  doctorDetails: {},
  // public fetches don't need validation
  publicDoctors: [],
  // pagination
  totalDoctors: 0,
  totalPages: 0,
  currentPage: 1,
  hasMore: true,
  // loading state
  loading: false,
  loadingMore: false,
  // error state
  error: false,
};

const doctorSlice = createSlice({
  name: "doctors",
  initialState,
  reducers: {
    clearSelectedDoctor: (state) => {
      state.doctorDetails = {};
      state.loading = false;
      state.error = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetch all doctors
      .addCase(fetchAllDoctors.pending, pendingHandler())
      .addCase(fetchAllDoctors.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.doctors = action.payload;
      })
      .addCase(fetchAllDoctors.rejected, rejectedHandler())

      // fetch doctor details
      .addCase(fetchDoctorDetails.pending, pendingHandler())
      .addCase(
        fetchDoctorDetails.fulfilled,
        fulfilledHandler({ detailsKey: "doctorDetails" })
      )
      .addCase(fetchDoctorDetails.rejected, rejectedHandler())

      // fetch public doctors
      .addCase(fetchPublicDoctors.pending, pendingPaginationHandler())
      .addCase(
        fetchPublicDoctors.fulfilled,
        fulfilledPaginationHandler({
          listKey: "publicDoctors",
          totalsMap: {
            totalItems: "totalDoctors",
          },
        })
      )
      .addCase(fetchPublicDoctors.rejected, rejectedPaginationHandler());
  },
});

export const { clearSelectedDoctor } = doctorSlice.actions;
export default doctorSlice.reducer;
