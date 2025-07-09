import api from "../lib/axios";
import { handleApiResponse, handleApiError } from "../lib/apiUtils";

/**
 * Users API Service
 * Handles all API calls related to users
 */

// Constants
const BASE_ENDPOINT = "/users";

/**
 * Gets all users
 * @returns {Promise<Array>} List of users
 */
export async function getAllUsers() {
  const response = await api.get(`${BASE_ENDPOINT}`);
  return handleApiResponse(response, "No users found");
}

/**
 * Gets a specific user by ID
 * @param {string} id - User ID
 * @returns {Promise<Object>} User details
 */
export async function getOneUser(id) {
  const response = await api.get(`${BASE_ENDPOINT}/one/${id}`);
  return handleApiResponse(response, "this user doesn't exist");
}

/**
 * Get My Data
 * @returns {Promise<Object>} Current user data
 */
export async function getMyData() {
  const response = await api.get(`${BASE_ENDPOINT}/one`);
  console.log("API Response for My Data:", response);
  return handleApiResponse(response, "Failed to get user data");
}
