export const selectSignState = (state) => state.sign;
export const selectSignUser = (state) => selectSignState(state).user;
export const selectSignRole = (state) => selectSignState(state).role;
export const selectSignLoading = (state) => selectSignState(state).loading;
export const selectSignError = (state) => selectSignState(state).error;
