import api from "../lib/axios";
import { handleApiResponse, handleApiError } from "../lib/apiUtils";

const BASE_ENDPOINT = "/otp";

/**
 * Sends a reset password OTP to the user's email
 * @param {string} email - User's email address
 */
export async function sendResetOTP(email) {
  try {
    const response = await api.post(`${BASE_ENDPOINT}/generation`, { email });
    return handleApiResponse(response, "Failed to send OTP");
  } catch (error) {
    return handleApiError(error, "sending OTP");
  }
}

/**
 * Verifies the OTP code received by the user
 * @param {Object} payload - Contains email and OTP code
 */
export async function verifyResetOTP(payload) {
  try {
    const response = await api.post(`${BASE_ENDPOINT}/password`, payload);
    return handleApiResponse(response, "Invalid or expired OTP");
  } catch (error) {
    return handleApiError(error, "verifying OTP");
  }
}

/**
 * Resets the user's password after OTP verification
 * @param {Object} payload - Contains email, newPassword, and confirmPassword
 */
export async function resetPassword(payload) {
  try {
    const response = await api.patch(`${BASE_ENDPOINT}/password`, payload);
    return handleApiResponse(response, "Failed to reset password");
  } catch (error) {
    return handleApiError(error, "resetting password");
  }
}
