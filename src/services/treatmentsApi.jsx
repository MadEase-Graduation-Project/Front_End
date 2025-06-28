import api from "../lib/axios";
import {
  createAuthHeader,
  handleApiResponse,
  handleApiError,
} from "../lib/apiUtils";

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
export async function getAllTreatments() {
  try {
    const response = await api.get(BASE_ENDPOINT);
    return handleApiResponse(response, "No treatments found");
  } catch (error) {
    return handleApiError(error, "fetching treatments");
  }
}

/**
 * Gets a specific treatment by ID
 * @param {string} id - Treatment ID
 * @returns {Promise<Object>} Treatment details
 */
export async function showTreatment(id) {
  try {
    const response = await api.get(BASE_ENDPOINT);
    const data = handleApiResponse(response, "No treatments found");

    const treatment = data.find((treatment) => treatment._id === id);
    if (!treatment) {
      throw new Error(`Treatment with id ${id} not found`);
    }

    return treatment;
  } catch (error) {
    return handleApiError(error, `fetching treatment ${id}`);
  }
}

/**
 * Adds a new treatment
 * @param {Object} treatmentData - New treatment data
 * @returns {Promise<Object>} Created treatment
 */
export async function addTreatment(treatmentData) {
  try {
    const response = await api.post(BASE_ENDPOINT, treatmentData);
    return handleApiResponse(response, "Failed to create treatment");
  } catch (error) {
    return handleApiError(error, "adding treatment");
  }
}

/**
 * Updates an existing treatment
 * @param {string} id - Treatment ID
 * @param {Object} treatmentData - Updated treatment data
 * @returns {Promise<Object>} Updated treatment
 */
export async function editTreatment(id, treatmentData) {
  try {
    const response = await api.put(`${BASE_ENDPOINT}/${id}`, treatmentData);
    return handleApiResponse(response, `Failed to update treatment ${id}`);
  } catch (error) {
    return handleApiError(error, `editing treatment ${id}`);
  }
}

/**
 * Deletes a treatment
 * @param {string} id - Treatment ID
 * @returns {Promise<Object>} Deletion result
 */
export async function deleteTreatment(id) {
  try {
    const response = await api.delete(`${BASE_ENDPOINT}/${id}`);
    return handleApiResponse(response, `Failed to delete treatment ${id}`);
  } catch (error) {
    return handleApiError(error, `deleting treatment ${id}`);
  }
}
