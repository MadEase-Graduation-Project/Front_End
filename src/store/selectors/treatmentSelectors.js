export const selectTreatmentsState = (state) => state.treatments;
export const selectAllTreatments = (state) =>
  selectTreatmentsState(state).treatments;
export const selectTreatmentsLoading = (state) =>
  selectTreatmentsState(state).loading;
export const selectTreatmentsError = (state) =>
  selectTreatmentsState(state).error;
export const selectSelectedTreatment = (state) =>
  selectTreatmentsState(state).selectedTreatment;

// selectTreatmentsPagination

export const selectTreatmentsPagination = (state) => ({
  currentPage: selectTreatmentsState(state).currentPage,
  totalPages: selectTreatmentsState(state).totalPages,
  hasMore: selectTreatmentsState(state).hasMore,
  loadingMore: selectTreatmentsState(state).loadingMore,
});
