import api from "../lib/axios";
import { handleApiResponse, handleApiError } from "../lib/apiUtils";

/**
 * Admins API Service
 * Handles all API calls related to Admins
 */

// Constants
const BASE_ENDPOINT = "/users";

/**
 * Gets all admins
 * @returns {Promise<Array>} List of admins
 */
export async function getAllAdmins() {
  const response = await api.get(`${BASE_ENDPOINT}/`);
  const data = handleApiResponse(response, "No users found");
  const admins = data?.data.filter((user) => user.role === "Admin");
  return admins;
}
