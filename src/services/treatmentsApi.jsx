import api from "../lib/axios";
import { handleApiResponse, handleApiError } from "../lib/apiUtils";

/**
 * Treatments API Service
 * Handles all API calls related to treatments
 */

// Constants
const BASE_ENDPOINT = "/treatments";

/**
 * Gets all treatments
 * @returns {Promise<Array>} List of treatments
 */
export async function getAllTreatments({ page = 1 } = {}) {
  const response = await api.get(BASE_ENDPOINT, { params: { page } });
  return handleApiResponse(response, "No treatments found");
}

/**
 * Gets a specific treatment by ID
 * @param {string} id - Treatment ID
 * @returns {Promise<Object>} Treatment details
 */
export async function showTreatment(id) {
  const response = await api.get(`${BASE_ENDPOINT}/${id}`);
  return handleApiResponse(response, "this treatment not found");
}

/**
 * Adds a new treatment
 * @param {Object} treatmentData - New treatment data
 * @returns {Promise<Object>} Created treatment
 */
export async function addTreatment(treatmentData) {
  const response = await api.post(BASE_ENDPOINT, treatmentData);
  return handleApiResponse(response, "Failed to create treatment");
}

/**
 * Updates an existing treatment
 * @param {string} id - Treatment ID
 * @param {Object} treatmentData - Updated treatment data
 * @returns {Promise<Object>} Updated treatment
 */
export async function editTreatment(id, treatmentData) {
  const response = await api.put(`${BASE_ENDPOINT}/${id}`, treatmentData);
  return handleApiResponse(response, `Failed to update treatment ${id}`);
}

/**
 * Deletes a treatment
 * @param {string} id - Treatment ID
 * @returns {Promise<Object>} Deletion result
 */
export async function deleteTreatment(id) {
  const response = await api.delete(`${BASE_ENDPOINT}/${id}`);
  return handleApiResponse(response, `Failed to delete treatment ${id}`);
}
