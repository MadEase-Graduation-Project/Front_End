import api from "../lib/axios";
import { handleApiResponse, handleApiError } from "../lib/apiUtils";

/**
 * Users API Service
 * Handles all API calls related to users signs
 */

// Constants
const BASE_ENDPOINT = "/users";

/**
 * Logs in a user
 * @param {Object} credentials - User credentials
 * @returns {Promise<Object>} Login response with token
 */
export async function loginUser(credentials) {
  try {
    const response = await api.post(`${BASE_ENDPOINT}/login`, credentials);
    return handleApiResponse(response, "Failed to login user");
  } catch (error) {
    console.error("Error logging in user:", error);
    return { token: null };
  }
}

/**
 * Registers a new user
 * @param {Object} userData - New user data
 * @returns {Promise<Object>} Registration response
 */
export async function registerUser(userData) {
  try {
    const response = await api.post(`${BASE_ENDPOINT}/register`, userData);
    return handleApiResponse(response, "Failed to register user");
  } catch (error) {
    return handleApiError(error, "registering user");
  }
}

/**
 * Logs out the current user
 * @returns {Promise<Object>} Logout response
 */
export async function logoutUser() {
  try {
    const response = await api.post(`${BASE_ENDPOINT}/logout`);
    return handleApiResponse(response, "Failed to logout user");
  } catch (error) {
    return handleApiError(error, "logging out user");
  }
}
