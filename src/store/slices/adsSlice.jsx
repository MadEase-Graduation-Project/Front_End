import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getAllAds,
  getAdById,
  addAd,
  updateAd,
  deleteAd,
} from "@/services/adsApi";
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

export const fetchAllAds = createAsyncThunk(
  "ads/fetchAllAds",
  async ({ page = 1 } = {}) => {
    return await getAllAds({ page });
  }
);

export const fetchAdById = createAsyncThunk(
  "ads/fetchAdById",
  async (id, { dispatch }) => {
    dispatch(clearSelectedAd());
    return await getAdById(id);
  }
);

export const createAd = createAsyncThunk("ads/createAd", async (adData) => {
  return await addAd(adData);
});

export const editAd = createAsyncThunk("ads/editAd", async ({ id, adData }) => {
  return await updateAd(id, adData);
});

export const removeAd = createAsyncThunk("ads/removeAd", async (id) => {
  return await deleteAd(id);
});

const initialState = {
  // data
  ads: [],
  selectedAd: {},
  // counts
  totalAdvertisements: 0,
  // pagination
  totalPages: 1,
  currentPage: 1,
  hasMore: true,
  loadingMore: false,
  // handling
  loading: false,
  error: false,
};

//* note that here we take the data of ads nonDirect from payload

const adsSlice = createSlice({
  name: "ads",
  initialState,
  reducers: {
    clearSelectedAd: (state) => {
      state.selectedAd = {};
      state.loading = false;
      state.error = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all ads
      .addCase(fetchAllAds.pending, pendingPaginationHandler())
      .addCase(
        fetchAllAds.fulfilled,
        fulfilledPaginationHandler({
          listKey: "ads",
          totalsMap: {
            totalItems: "totalAdvertisements",
          },
        })
      )
      .addCase(fetchAllAds.rejected, rejectedPaginationHandler())

      // Fetch ad by ID
      .addCase(fetchAdById.pending, pendingHandler())
      .addCase(
        fetchAdById.fulfilled,
        fulfilledHandler({ detailsKey: "selectedAd" })
      )
      .addCase(fetchAdById.rejected, rejectedHandler())

      // Create ad
      .addCase(createAd.pending, pendingHandler())
      .addCase(createAd.fulfilled, fulfilledHandler())
      .addCase(createAd.rejected, rejectedHandler())

      // Edit ad
      .addCase(editAd.pending, pendingHandler())
      .addCase(editAd.fulfilled, fulfilledHandler())
      .addCase(editAd.rejected, rejectedHandler())

      // Remove ad
      .addCase(removeAd.pending, pendingHandler())
      .addCase(removeAd.fulfilled, fulfilledHandler())
      .addCase(removeAd.rejected, rejectedHandler());
  },
});

export const { clearSelectedAd } = adsSlice.actions;
export default adsSlice.reducer;
