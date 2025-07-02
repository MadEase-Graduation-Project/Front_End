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
  try {
    const response = await api.get(`${BASE_ENDPOINT}`);
    return handleApiResponse(response, "No users found");
  } catch (error) {
    return handleApiError(error, "fetching users");
  }
}

/**
 * Gets a specific user by ID
 * @param {string} id - User ID
 * @returns {Promise<Object>} User details
 */
export async function getOneUser(id) {
  try {
    const response = await api.get(`${BASE_ENDPOINT}/one/${id}`);
    return handleApiResponse(response, "this user doesn't exist");
  } catch (error) {
    return handleApiError(error, `fetching user ${id}`);
  }
}

/**
 * Get My Data
 * @returns {Promise<Object>} Current user data
 */
export async function getMyData() {
  try {
    const response = await api.get(`${BASE_ENDPOINT}/one`);
    return handleApiResponse(response, "Failed to get user data");
  } catch (error) {
    return handleApiError(error, "fetching user data");
  }
}
