// Selectors for chatbot slice
export const selectChatbot = (state) => state.chatbot;
// session
export const selectChatbotSession = (state) => selectChatbot(state).session; // data
export const selectChatbotSessionStart = (state) =>
  selectChatbot(state).sessionStart; // boolean
// ------------------------
export const selectChatbotMessage = (state) => selectChatbot(state).message;
export const selectChatbotSymptoms = (state) => selectChatbot(state).symptoms;
export const selectChatbotLoading = (state) => selectChatbot(state).loading;
export const selectChatbotError = (state) => selectChatbot(state).error;
