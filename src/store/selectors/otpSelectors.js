export const selectOtpState = (state) => state.otp;
export const selectOtpLoading = (state) => selectOtpState(state).loading;
export const selectOtpError = (state) => selectOtpState(state).error;
export const selectOtpVerified = (state) => selectOtpState(state).otpVerified;
export const selectOtpGenerated = (state) => selectOtpState(state).otpGenerated;
export const selectPasswordReset = (state) =>
  selectOtpState(state).passwordReset;
export const selectOtpMsg = (state) => selectOtpState(state).msg;
export const selectOtpResetToken = (state) => selectOtpState(state).resetToken;
