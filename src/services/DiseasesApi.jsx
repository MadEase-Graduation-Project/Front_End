import api from "./axios";
import {
  createAuthHeader,
  handleApiResponse,
  handleApiError,
} from "./apiUtils";

/**
 * Diseases API Service
 * Handles all API calls related to diseases
 */

// Constants
const BASE_ENDPOINT = "/diseases";

/**
 * Gets all diseases
 * @returns {Promise<Array>} List of diseases
 */
export async function getAllDiseases() {
  try {
    const response = await api.get(BASE_ENDPOINT, createAuthHeader());
    return handleApiResponse(response, "No diseases found");
  } catch (error) {
    return handleApiError(error, "fetching diseases");
  }
}

/**
 * Gets a specific disease by ID
 * @param {string} id - Disease ID
 * @returns {Promise<Object>} Disease details
 */
export async function showDisease(id) {
  try {
    const response = await api.get(BASE_ENDPOINT, createAuthHeader());
    const data = handleApiResponse(response, "No diseases found");

    const disease = data.find((disease) => disease._id === id);
    if (!disease) {
      throw new Error(`Disease with id ${id} not found`);
    }

    return disease;
  } catch (error) {
    return handleApiError(error, `fetching disease ${id}`);
  }
}

/**
 * Adds a new disease
 * @param {Object} diseaseData - New disease data
 * @returns {Promise<Object>} Created disease
 */
export async function addDisease(diseaseData) {
  try {
    const response = await api.post(
      BASE_ENDPOINT,
      diseaseData,
      createAuthHeader()
    );
    return handleApiResponse(response, "Failed to create disease");
  } catch (error) {
    return handleApiError(error, "adding disease");
  }
}

/**
 * Updates an existing disease
 * @param {string} id - Disease ID
 * @param {Object} diseaseData - Updated disease data
 * @returns {Promise<Object>} Updated disease
 */
export async function editDisease(id, diseaseData) {
  try {
    const response = await api.put(
      `${BASE_ENDPOINT}/${id}`,
      diseaseData,
      createAuthHeader()
    );
    return handleApiResponse(response, `Failed to update disease ${id}`);
  } catch (error) {
    return handleApiError(error, `editing disease ${id}`);
  }
}

/**
 * Deletes a disease
 * @param {string} id - Disease ID
 * @returns {Promise<Object>} Deletion result
 */
export async function deleteDisease(id) {
  try {
    const response = await api.delete(
      `${BASE_ENDPOINT}/${id}`,
      createAuthHeader()
    );
    return handleApiResponse(response, `Failed to delete disease ${id}`);
  } catch (error) {
    return handleApiError(error, `deleting disease ${id}`);
  }
}
