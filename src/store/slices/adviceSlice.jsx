import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getAllAdvices,
  showAdvice,
  addAdvice,
  editAdvice,
  deleteAdvice,
} from "@/services/adviceApi";
import {
  fulfilledHandler,
  pendingHandler,
  rejectedHandler,
} from "@/utils/casesHandlersUtils";

export const fetchAllAdvices = createAsyncThunk(
  "advices/fetchAllAdvices",
  async () => {
    return await getAllAdvices();
  }
);

export const fetchAdviceById = createAsyncThunk(
  "advices/fetchAdviceById",
  async (id, { dispatch }) => {
    dispatch(clearSelectedAdvice());
    return await showAdvice(id);
  }
);

export const createAdvice = createAsyncThunk(
  "advices/createAdvice",
  async (adviceData) => {
    return await addAdvice(adviceData);
  }
);

export const updateAdvice = createAsyncThunk(
  "advices/updateAdvice",
  async ({ id, adviceData }) => {
    return await editAdvice(id, adviceData);
  }
);

export const removeAdvice = createAsyncThunk(
  "advices/removeAdvice",
  async (id) => {
    return await deleteAdvice(id);
  }
);

const initialState = {
  // data
  advices: [],
  selectedAdvice: {},
  // counts
  totalAdvices: 0,
  // handling
  loading: false,
  error: null,
};

const adviceSlice = createSlice({
  name: "advices",
  initialState,
  reducers: {
    clearSelectedAdvice: (state) => {
      state.selectedAdvice = {};
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all advices
      .addCase(fetchAllAdvices.pending, pendingHandler())
      .addCase(fetchAllAdvices.fulfilled, (state, action) => {
        state.loading = false;
        state.totalAdvices = action.payload?.total;
        state.advices = action.payload?.data;
      })
      .addCase(fetchAllAdvices.rejected, rejectedHandler())

      // Fetch advice by ID
      .addCase(fetchAdviceById.pending, pendingHandler())
      .addCase(
        fetchAdviceById.fulfilled,
        fulfilledHandler({ detailsKey: "selectedAdvice" })
      )
      .addCase(fetchAdviceById.rejected, rejectedHandler())

      // Create advice
      .addCase(createAdvice.pending, pendingHandler())
      .addCase(createAdvice.fulfilled, fulfilledHandler())
      .addCase(createAdvice.rejected, rejectedHandler())

      // Update advice
      .addCase(updateAdvice.pending, pendingHandler())
      .addCase(updateAdvice.fulfilled, fulfilledHandler())
      .addCase(updateAdvice.rejected, rejectedHandler())

      // Remove advice
      .addCase(removeAdvice.pending, pendingHandler())
      .addCase(removeAdvice.fulfilled, fulfilledHandler())
      .addCase(removeAdvice.rejected, rejectedHandler());
  },
});

export const { clearSelectedAdvice } = adviceSlice.actions;
export default adviceSlice.reducer;
