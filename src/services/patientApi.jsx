import api from "../lib/axios";
import { handleApiResponse, handleApiError } from "../lib/apiUtils";

/**
 * Patients API Service
 * Handles all API calls related to Patients
 */

// Constants
const BASE_ENDPOINT = "/users";

/**
 * Gets all patients
 * @returns {Promise<Array>} List of patients
 */
export async function getAllPatients() {
  try {
    const response = await api.get(`${BASE_ENDPOINT}`);
    const data = handleApiResponse(response, "No users found");
    const patients = data?.data.filter((user) => user.role === "Patient");
    return patients;
  } catch (error) {
    return handleApiError(error, "fetching patients");
  }
}
