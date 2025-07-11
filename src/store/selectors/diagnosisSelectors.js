export const selectDiagnosisState = (state) => state.diagnosis;
export const selectAllDiagnosis = (state) =>
  selectDiagnosisState(state).diagnosis;
export const selectDiagnosisLoading = (state) =>
  selectDiagnosisState(state).loading;
export const selectDiagnosisError = (state) =>
  selectDiagnosisState(state).error;
export const selectSelectedDiagnosis = (state) =>
  selectDiagnosisState(state).selectedDiagnosis;
export const selectTotalDiagnosis = (state) =>
  selectDiagnosisState(state).totalDiagnosis;
