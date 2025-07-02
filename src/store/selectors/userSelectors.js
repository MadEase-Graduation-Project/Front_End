export const selectUsersState = (state) => state.users;
export const selectAllUsers = (state) => selectUsersState(state).users;
export const selectUsersLoading = (state) => selectUsersState(state).loading;
export const selectUsersError = (state) => selectUsersState(state).error;
export const selectSelectedUser = (state) =>
  selectUsersState(state).userDetails;
export const selectMyDetails = (state) => selectUsersState(state).myDetails;
export const selectTotalUsers = (state) => selectUsersState(state).totalUsers;
export const selectTotalAdmin = (state) => selectUsersState(state).totalAdmin;
export const selectTotalDoctors = (state) =>
  selectUsersState(state).totalDoctors;
export const selectTotalPatients = (state) =>
  selectUsersState(state).totalPatients;
export const selectTotalNurses = (state) => selectUsersState(state).totalNurses;
export const selectTotalHospitals = (state) =>
  selectUsersState(state).totalHospitals;
