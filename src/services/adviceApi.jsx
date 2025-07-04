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
  const response = await api.get(BASE_ENDPOINT);
  return handleApiResponse(response, "No advices found");
}

/**
 * Gets a specific advice by ID
 * @param {string} id - Advice ID
 * @returns {Promise<Object>} Advice details
 */
export async function showAdvice(id) {
  const response = await api.get(`${BASE_ENDPOINT}/${id}`);
  return handleApiResponse(response, `Advice with id ${id} not found`);
}

/**
 * Adds a new advice
 * @param {Object} adviceData - New advice data
 * @returns {Promise<Object>} Created advice
 */
export async function addAdvice(adviceData) {
  const response = await api.post(BASE_ENDPOINT, adviceData);
  return handleApiResponse(response, "Failed to create advice");
}

/**
 * Updates an existing advice
 * @param {string} id - Advice ID
 * @param {Object} adviceData - Updated advice data
 * @returns {Promise<Object>} Updated advice
 */
export async function editAdvice(id, adviceData) {
  const response = await api.put(`${BASE_ENDPOINT}/${id}`, adviceData);
  return handleApiResponse(response, `Failed to update advice ${id}`);
}

/**
 * Deletes an advice
 * @param {string} id - Advice ID
 * @returns {Promise<Object>} Deletion result
 */
export async function deleteAdvice(id) {
  const response = await api.delete(`${BASE_ENDPOINT}/${id}`);
  return handleApiResponse(response, `Failed to delete advice ${id}`);
}

// advice like
export async function addAdviceLike(adviceId) {
  const response = await api.post(`/advice/${adviceId}/like`);
  return handleApiResponse(response, "Failed to like advice");
}

// advice dislike
export async function addAdviceDislike(adviceId) {
  const response = await api.post(`/advice/${adviceId}/dislike`);
  return handleApiResponse(response, "Failed to dislike advice");
}
