import api from "../lib/axios";
import { handleApiResponse } from "../lib/apiUtils";

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
  const response = await api.get(`${BASE_ENDPOINT}/`);
  const data = handleApiResponse(response, "No users found");
  const doctors = data?.data.filter((user) => user.role === "Doctor");
  return doctors;
}

/**
 * Get all doctors for anyone
 * @returns {Promise<Array>} List of doctors
 */
export async function getAllDoctorsPublic({ page = 1 } = {}) {
  const response = await api.get(`${BASE_ENDPOINT}/doctors`, {
    params: { page },
  });
  return handleApiResponse(response, "No Doctors found");
}

/**
 * Get specific doctor details
 * @param {string} id - Doctor ID
 * @returns {Promise<Object>} Doctor details
 */
export async function showDoctorDetails({ name }) {
  const response = await api.get(`/doctor`, { params: { name } });
  const data = handleApiResponse(response, "No Doctor found");
  return data.doctor;
}
