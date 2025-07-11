import api from "../lib/axios";
import { handleApiResponse } from "../lib/apiUtils";

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
export async function updateUserData(formData) {
  const response = await api.patch(`${BASE_ENDPOINT}`, formData);
  const data = handleApiResponse(response, "Failed to update user data");
  return data?.data;
}

/**
 * Deletes a user
 * @returns {Promise<Object>} Delete response
 */
export async function deleteUser() {
  const response = await api.delete(`${BASE_ENDPOINT}`);
  const data = handleApiResponse(response, "Failed to delete user");
  return data?.data;
}

// to change any user role
export async function changeUserRole(userId, { newRole }) {
  const response = await api.patch(`${BASE_ENDPOINT}/role/${userId}`, {
    newRole,
  });
  return handleApiResponse(response, "Failed to update user avatar");
}

// to rate hospital or doctor 1 - 5
export async function rateUser({ userId, rating }) {
  const response = await api.patch(`/rate`, { userId, rating });
  return handleApiResponse(response, "Failed to update user rating");
}
