import api from "../lib/axios";
import { handleApiResponse, handleApiError } from "../lib/apiUtils";

/**
 * Nurses API Services
 * Handles all API calls related to Nurses
 */

// Constants
const BASE_ENDPOINT = "/users";

/**
 * Gets all nurses
 * @returns {Promise<Array>} List of nurses
 */
export async function getAllNurses() {
  try {
    const response = await api.get(`${BASE_ENDPOINT}/`);
    const data = handleApiResponse(response, "No Nurses found");
    const nurses = data?.data.filter((user) => user.role === "Nurse");
    return nurses;
  } catch (error) {
    return handleApiError(error, "fetching nurses");
  }
}
