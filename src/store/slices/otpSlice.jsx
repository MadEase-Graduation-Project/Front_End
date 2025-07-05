import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { verifyOTP, generateOTP, resetPassword } from "../../services/otpApi";

export const generateOtp = createAsyncThunk("otp/generate", async (email) => {
  return await generateOTP(email);
});

export const verifyOtp = createAsyncThunk("otp/verify", async (params) => {
  return await verifyOTP(params);
});

export const resetPasswordOTP = createAsyncThunk(
  "otp/resetPassword",
  async (params) => {
    return await resetPassword(params);
  }
);

const initialState = {
  loading: false,
  error: null,
  otpVerified: false,
  otpGenerated: false,
  passwordReset: false,
  msg: null,
  resetToken: null,
};

const otpSlice = createSlice({
  name: "otp",
  initialState,
  reducers: {
    resetOtpState: (state) => {
      state.loading = false;
      state.error = false;
      state.otpVerified = false;
      state.otpGenerated = false;
      state.passwordReset = false;
      state.msg = null;
      state.resetToken = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Generate OTP
      .addCase(generateOtp.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.otpGenerated = false;
      })
      .addCase(generateOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.otpGenerated = action.payload?.success;
        state.msg = action.payload?.message;
        state.error = null;
      })
      .addCase(generateOtp.rejected, (state) => {
        state.loading = false;
        state.otpGenerated = false;
        state.error = true;
      })
      // Verify OTP
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.otpVerified = false;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.otpVerified = action.payload?.success;
        state.msg = action.payload?.message;
        state.resetToken = action.payload?.data;
        state.error = null;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.otpVerified = false;
        state.error = true;
      })
      // Reset Password
      .addCase(resetPasswordOTP.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.passwordReset = false;
      })
      .addCase(resetPasswordOTP.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.passwordReset = !!action.payload?.success;
        state.msg = action.payload?.message;
      })
      .addCase(resetPasswordOTP.rejected, (state, action) => {
        state.loading = false;
        state.passwordReset = false;
        state.error = true;
      });
  },
});

export const { resetOtpState } = otpSlice.actions;
export default otpSlice.reducer;
