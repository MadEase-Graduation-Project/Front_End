import api from "../lib/axios";
import { handleApiResponse, handleApiError } from "../lib/apiUtils";

/**
 * Disease Categories API Service
 * Handles all API calls related to disease categories
 */

// Constants
const BASE_ENDPOINT = "/diseasescategories";

/**
 * Gets all disease categories
 * @returns {Promise<Array>} List of disease categories
 */
export async function getAllDiseaseCategories({ page = 1 } = {}) {
  const response = await api.get(BASE_ENDPOINT, { params: { page } });
  return handleApiResponse(response, "No disease categories found");
}

/**
 * Gets a specific disease category by ID
 * @param {string} id - Disease category ID
 * @returns {Promise<Object>} Disease category details
 */
export async function showDiseaseCategory(id) {
  const response = await api.get(`${BASE_ENDPOINT}/${id}`);
  return handleApiResponse(response, "this category was not found");
}

/**
 * Adds a new disease category
 * @param {Object} categoryData - New disease category data
 * @returns {Promise<Object>} Created disease category
 */
export async function addDiseaseCategory(categoryData) {
  const response = await api.post(BASE_ENDPOINT, categoryData);
  return handleApiResponse(response, "Failed to create disease category");
}

/**
 * Updates an existing disease category
 * @param {string} id - Disease category ID
 * @param {Object} categoryData - Updated disease category data
 * @returns {Promise<Object>} Updated disease category
 */
export async function editDiseaseCategory(id, categoryData) {
  const response = await api.put(`${BASE_ENDPOINT}/${id}`, categoryData);
  return handleApiResponse(response, `Failed to update disease category ${id}`);
}

/**
 * Deletes a disease category
 * @param {string} id - Disease category ID
 * @returns {Promise<Object>} Deletion result
 */
export async function deleteDiseaseCategory(id) {
  const response = await api.delete(`${BASE_ENDPOINT}/${id}`);
  return handleApiResponse(response, `Failed to delete disease category ${id}`);
}
