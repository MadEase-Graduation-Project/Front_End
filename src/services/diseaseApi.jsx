import api from "../lib/axios";
import { handleApiResponse } from "../lib/apiUtils";

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
export async function getAllDiseases({ page = 1 } = {}) {
  const response = await api.get(BASE_ENDPOINT, { params: { page } });
  return handleApiResponse(response, "No diseases found");
}

/**
 * Gets a specific disease by ID
 * @param {string} id - Disease ID
 * @returns {Promise<Object>} Disease details
 */
export async function showDisease(id) {
  const response = await api.get(`${BASE_ENDPOINT}/${id}`);
  return handleApiResponse(response, "this disease not found");
}

/**
 * Adds a new disease
 * @param {Object} diseaseData - New disease data
 * @returns {Promise<Object>} Created disease
 */
export async function addDisease(diseaseData) {
  const response = await api.post(BASE_ENDPOINT, diseaseData);
  return handleApiResponse(response, "Failed to create disease");
}

/**
 * Updates an existing disease
 * @param {string} id - Disease ID
 * @param {Object} diseaseData - Updated disease data
 * @returns {Promise<Object>} Updated disease
 */
export async function editDisease(id, diseaseData) {
  const response = await api.put(`${BASE_ENDPOINT}/${id}`, diseaseData);
  return handleApiResponse(response, `Failed to update disease ${id}`);
}

/**
 * Deletes a disease
 * @param {string} id - Disease ID
 * @returns {Promise<Object>} Deletion result
 */
export async function deleteDisease(id) {
  const response = await api.delete(`${BASE_ENDPOINT}/${id}`);
  return handleApiResponse(response, `Failed to delete disease ${id}`);
}
