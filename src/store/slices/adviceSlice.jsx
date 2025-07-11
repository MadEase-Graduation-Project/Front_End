import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getAllAdvices,
  showAdvice,
  addAdvice,
  editAdvice,
  deleteAdvice,
  addAdviceLike,
  addAdviceDislike,
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
    await deleteAdvice(id);
    return id;
  }
);

// Add like advice thunk
export const likeAdvice = createAsyncThunk(
  "advices/likeAdvice",
  async (adviceId) => {
    return await addAdviceLike(adviceId);
  }
);

// Add dislike advice thunk
export const dislikeAdvice = createAsyncThunk(
  "advices/dislikeAdvice",
  async (adviceId) => {
    return await addAdviceDislike(adviceId);
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
  error: false,
};

//* note that here we take the data of advices nonDirect from payload

const adviceSlice = createSlice({
  name: "advices",
  initialState,
  reducers: {
    clearSelectedAdvice: (state) => {
      state.selectedAdvice = {};
      state.loading = false;
      state.error = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all advices
      .addCase(fetchAllAdvices.pending, pendingHandler())
      .addCase(fetchAllAdvices.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.advices = action.payload?.data;
        state.totalAdvices = action.payload?.totalAdvices;
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
      .addCase(
        updateAdvice.fulfilled,
        fulfilledHandler({ detailsKey: "selectedAdvice" })
      )
      .addCase(updateAdvice.rejected, rejectedHandler())

      // Remove advice
      .addCase(removeAdvice.pending, pendingHandler())
      .addCase(removeAdvice.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        const deletedId = action.payload;
        state.advices = state.advices.filter(
          (advice) => advice._id !== deletedId
        );
        if (state.selectedAdvice?._id === deletedId) {
          state.selectedAdvice = {};
        }
      })
      .addCase(removeAdvice.rejected, rejectedHandler())

      // Like advice
      .addCase(likeAdvice.pending, pendingHandler())
      .addCase(likeAdvice.fulfilled, fulfilledHandler())
      .addCase(likeAdvice.rejected, rejectedHandler())

      // Dislike advice
      .addCase(dislikeAdvice.pending, pendingHandler())
      .addCase(dislikeAdvice.fulfilled, fulfilledHandler())
      .addCase(dislikeAdvice.rejected, rejectedHandler());
  },
});

export const { clearSelectedAdvice } = adviceSlice.actions;
export default adviceSlice.reducer;
