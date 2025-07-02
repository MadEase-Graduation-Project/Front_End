export const selectNursesState = (state) => state.nurses;
export const selectAllNurses = (state) => selectNursesState(state).nurses;
export const selectNursesLoading = (state) => selectNursesState(state).loading;
export const selectNursesError = (state) => selectNursesState(state).error;
