import api from "../lib/axios";
import { handleApiResponse, handleApiError } from "../lib/apiUtils";

/**
 * OTP API Service
 * Handles all API calls related to OTP
 */

// Constants
const BASE_ENDPOINT = "/otp";

export const generateOTP = async (email) => {
  try {
    const response = await api.post(`${BASE_ENDPOINT}/generation`, {
      email,
    });
    return handleApiResponse(response, "can't generate OTP");
  } catch (error) {
    return handleApiError(error);
  }
};

export const verifyOTP = async ({ email, otp }) => {
  try {
    const response = await api.post(`${BASE_ENDPOINT}/verification`, {
      email,
      otp,
    });
    return handleApiResponse(response, "can't verify OTP");
  } catch (error) {
    return handleApiError(error);
  }
};

export const resetPassword = async ({ email, otp, password }) => {
  try {
    const response = await api.post(`${BASE_ENDPOINT}/reset`, {
      email,
      otp,
      password,
    });
    return handleApiResponse(response, "can't reset password");
  } catch (error) {
    return handleApiError(error);
  }
};
