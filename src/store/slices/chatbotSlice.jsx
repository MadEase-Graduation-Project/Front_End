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

export const startChatBotSession = createAsyncThunk(
  "chatbot/startSession",
  async (_, { dispatch }) => {
    dispatch(clearChatbotSession());
    return await startSession();
  }
);

export const sendChatBotMsg = createAsyncThunk(
  "chatbot/sendMsg",
  async (body) => {
    return await sendMsg(body);
  }
);

const initialState = {
  session: null,
  sessionStart: false,
  message: {},
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
      state.sessionStart = false;
      state.message = {};
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
      .addCase(startChatBotSession.pending, pendingHandler())
      .addCase(startChatBotSession.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.session = action.payload?.data;
        state.sessionStart = action.payload?.success || true;
      })
      .addCase(startChatBotSession.rejected, rejectedHandler())

      // Send message
      .addCase(sendChatBotMsg.pending, pendingHandler())
      .addCase(sendChatBotMsg.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.message = action.payload?.data;
      })
      .addCase(sendChatBotMsg.rejected, rejectedHandler());
  },
});

export const { clearChatbotSession } = chatbotSlice.actions;
export default chatbotSlice.reducer;
