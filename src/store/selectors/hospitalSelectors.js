export const selectHospitalState = (state) => state.hospital;
export const selectAllHospitals = (state) =>
  selectHospitalState(state).hospitals;
export const selectHospitalsLoading = (state) =>
  selectHospitalState(state).loading;
export const selectHospitalsError = (state) => selectHospitalState(state).error;
export const selectSelectedHospital = (state) =>
  selectHospitalState(state).hospital;

// selectHospitalsPagination

export const selectHospitalsPagination = (state) => ({
  currentPage: selectHospitalState(state).currentPage,
  totalPages: selectHospitalState(state).totalPages,
  hasMore: selectHospitalState(state).hasMore,
  loadingMore: selectHospitalState(state).loadingMore,
});
