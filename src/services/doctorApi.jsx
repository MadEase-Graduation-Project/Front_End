import api from "../lib/axios";
import { handleApiResponse, handleApiError } from "../lib/apiUtils";

/**
 * Doctors API Service
 * Handles all API calls related to Doctors
 */

// Constants
const BASE_ENDPOINT = "/users";

/**
 * Get all doctors fro Admin Access
 * @returns {Promise<Array>} List of doctors
 */
export async function getAllDoctors() {
  try {
    const response = await api.get(`${BASE_ENDPOINT}/`);
    const data = handleApiResponse(response, "No users found");
    const doctors = data?.data.filter((user) => user.role === "Doctor");
    return doctors;
  } catch (error) {
    return handleApiError(error, "fetching doctors");
  }
}

/**
 * Get all doctors for anyone
 * @returns {Promise<Array>} List of doctors
 */
export async function getAllDoctorsPublic({ page = 1 } = {}) {
  try {
    const response = await api.get(`${BASE_ENDPOINT}/doctors`, {
      params: { page },
    });
    return handleApiResponse(response, "No Doctors found");
  } catch (error) {
    return handleApiError(error, "fetching doctors");
  }
}

/**
 * Get specific doctor details
 * @param {string} id - Doctor ID
 * @returns {Promise<Object>} Doctor details
 */
export async function showDoctorDetails({ name }) {
  try {
    const response = await api.get(`/doctor`, { params: { name } });
    const data = handleApiResponse(response, "No Doctor found");
    return data.doctor;
  } catch (error) {
    return handleApiError(error, "fetching doctor details");
  }
}
