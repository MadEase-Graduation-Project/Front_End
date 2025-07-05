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
  const response = await api.get(`${BASE_ENDPOINT}`);
  const data = handleApiResponse(response, "No users found");
  const patients = data?.data.filter((user) => user.role === "Patient");
  return patients;
}

// get all patients by basic data for doctors and nurses
export async function showPatients() {
  const response = await api.get(`/patient/all`);
  return handleApiResponse(response, "No users found");
}

// get one patient by id
export async function showPatientById(id) {
  const response = await api.get(`/patient/one/${id}`);
  const data = handleApiResponse(response, "this patient not found");
  return data?.patient;
}
