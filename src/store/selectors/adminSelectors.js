export const selectAdminsState = (state) => state.admins;
export const selectAllAdmins = (state) => selectAdminsState(state).admins;
export const selectAdminsLoading = (state) => selectAdminsState(state).loading;
export const selectAdminsError = (state) => selectAdminsState(state).error;
