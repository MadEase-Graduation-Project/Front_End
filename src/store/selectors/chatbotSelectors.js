// Selectors for chatbot slice
export const selectChatbot = (state) => state.chatbot;
export const selectChatbotSession = (state) => selectChatbot(state).session;
export const selectChatbotMessages = (state) => selectChatbot(state).messages;
export const selectChatbotSymptoms = (state) => selectChatbot(state).symptoms;
export const selectChatbotLoading = (state) => selectChatbot(state).loading;
export const selectChatbotError = (state) => selectChatbot(state).error;
