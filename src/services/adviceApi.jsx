import api from "../lib/axios";
import { handleApiResponse, handleApiError } from "../lib/apiUtils";

/**
 * Advices API Service
 * Handles all API calls related to advices
 */

// Constants
const BASE_ENDPOINT = "/advices";

/**
 * Gets all advices
 * @returns {Promise<Array>} List of advices
 */
export async function getAllAdvices() {
  try {
    const response = await api.get(BASE_ENDPOINT);
    return handleApiResponse(response, "No advices found");
  } catch (error) {
    return handleApiError(error, "fetching advices");
  }
}

/**
 * Gets a specific advice by ID
 * @param {string} id - Advice ID
 * @returns {Promise<Object>} Advice details
 */
export async function showAdvice(id) {
  try {
    const response = await api.get(`${BASE_ENDPOINT}/${id}`);
    return handleApiResponse(response, `Advice with id ${id} not found`);
  } catch (error) {
    return handleApiError(error, `fetching advice ${id}`);
  }
}

/**
 * Adds a new advice
 * @param {Object} adviceData - New advice data
 * @returns {Promise<Object>} Created advice
 */
export async function addAdvice(adviceData) {
  try {
    const response = await api.post(BASE_ENDPOINT, adviceData);
    return handleApiResponse(response, "Failed to create advice");
  } catch (error) {
    return handleApiError(error, "adding advice");
  }
}

/**
 * Updates an existing advice
 * @param {string} id - Advice ID
 * @param {Object} adviceData - Updated advice data
 * @returns {Promise<Object>} Updated advice
 */
export async function editAdvice(id, adviceData) {
  try {
    const response = await api.put(`${BASE_ENDPOINT}/${id}`, adviceData);
    return handleApiResponse(response, `Failed to update advice ${id}`);
  } catch (error) {
    return handleApiError(error, `editing advice ${id}`);
  }
}

/**
 * Deletes an advice
 * @param {string} id - Advice ID
 * @returns {Promise<Object>} Deletion result
 */
export async function deleteAdvice(id) {
  try {
    const response = await api.delete(`${BASE_ENDPOINT}/${id}`);
    return handleApiResponse(response, `Failed to delete advice ${id}`);
  } catch (error) {
    return handleApiError(error, `deleting advice ${id}`);
  }
}
