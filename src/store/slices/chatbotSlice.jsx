import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { startSession, sendMsg, allSymptoms } from "@/services/chatbotApi";
import {
  fulfilledHandler,
  pendingHandler,
  rejectedHandler,
} from "@/utils/casesHandlersUtils";

export const fetchChatbotSymptoms = createAsyncThunk(
  "chatbot/allSymptoms",
  async () => {
    return await allSymptoms();
  }
);

export const fetchChatbotSession = createAsyncThunk(
  "chatbot/startSession",
  async ({ dispatch }) => {
    dispatch(clearChatbotSession());
    return await startSession();
  }
);

export const fetchChatbotMessage = createAsyncThunk(
  "chatbot/sendMsg",
  async (body) => {
    return await sendMsg(body);
  }
);

const initialState = {
  session: null,
  messages: [],
  symptoms: [],
  loading: false,
  error: false,
};

const chatbotSlice = createSlice({
  name: "chatbot",
  initialState,
  reducers: {
    clearChatbotSession: (state) => {
      state.session = null;
      state.messages = [];
      state.loading = false;
      state.error = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch symptoms
      .addCase(fetchChatbotSymptoms.pending, pendingHandler())
      .addCase(fetchChatbotSymptoms.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.symptoms = action.payload?.data;
      })
      .addCase(fetchChatbotSymptoms.rejected, rejectedHandler())

      // Start session
      .addCase(fetchChatbotSession.pending, pendingHandler())
      .addCase(fetchChatbotSession.fulfilled, (state, action) => {
        state.loading = false;
        state.session = action.payload?.data;
        state.error = false;
      })
      .addCase(fetchChatbotSession.rejected, rejectedHandler())

      // Send message
      .addCase(fetchChatbotMessage.pending, pendingHandler())
      .addCase(fetchChatbotMessage.fulfilled, fulfilledHandler())
      .addCase(fetchChatbotMessage.rejected, rejectedHandler());
  },
});

export const { clearChatbotSession } = chatbotSlice.actions;
export default chatbotSlice.reducer;
