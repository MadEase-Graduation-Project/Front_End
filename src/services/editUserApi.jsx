import api from "../lib/axios";
import { handleApiResponse, handleApiError } from "../lib/apiUtils";

/**
 * Users API Service
 * Handles all API calls related to users edits
 */

// Constants
const BASE_ENDPOINT = "/users";

/**
 * Updates user data
 * @param {Object} userData - Updated user data
 * @returns {Promise<Object>} Updated user data
 */
export async function updateUserData(userData) {
  try {
    const response = await api.patch(`${BASE_ENDPOINT}`, userData);
    const data = handleApiResponse(response, "Failed to update user data");
    return data?.data;
  } catch (error) {
    return handleApiError(error, "updating user data");
  }
}

/**
 * Deletes a user
 * @param {string} userId - User ID
 * @returns {Promise<Object>} Delete response
 */
export async function deleteUser(userId) {
  try {
    const response = await api.delete(`${BASE_ENDPOINT}/${userId}`);
    const data = handleApiResponse(response, "Failed to delete user");
    return data?.data;
  } catch (error) {
    return handleApiError(error, "deleting user");
  }
}
