import api from "../lib/axios";
import {
  createAuthHeader,
  handleApiResponse,
  handleApiError,
} from "../lib/apiUtils";

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
export async function getAllDiseaseCategories() {
  try {
    const response = await api.get(BASE_ENDPOINT, createAuthHeader());
    return handleApiResponse(response, "No disease categories found");
  } catch (error) {
    return handleApiError(error, "fetching disease categories");
  }
}

/**
 * Gets a specific disease category by ID
 * @param {string} id - Disease category ID
 * @returns {Promise<Object>} Disease category details
 */
export async function showDiseaseCategory(id) {
  try {
    const response = await api.get(BASE_ENDPOINT, createAuthHeader());
    const data = handleApiResponse(response, "No disease categories found");

    const category = data.find((category) => category._id === id);
    if (!category) {
      throw new Error(`Disease category with id ${id} not found`);
    }

    return category;
  } catch (error) {
    return handleApiError(error, `fetching disease category ${id}`);
  }
}

/**
 * Adds a new disease category
 * @param {Object} categoryData - New disease category data
 * @returns {Promise<Object>} Created disease category
 */
export async function addDiseaseCategory(categoryData) {
  try {
    const response = await api.post(
      BASE_ENDPOINT,
      categoryData,
      createAuthHeader()
    );
    return handleApiResponse(response, "Failed to create disease category");
  } catch (error) {
    return handleApiError(error, "adding disease category");
  }
}

/**
 * Updates an existing disease category
 * @param {string} id - Disease category ID
 * @param {Object} categoryData - Updated disease category data
 * @returns {Promise<Object>} Updated disease category
 */
export async function editDiseaseCategory(id, categoryData) {
  try {
    const response = await api.put(
      `${BASE_ENDPOINT}/${id}`,
      categoryData,
      createAuthHeader()
    );
    return handleApiResponse(
      response,
      `Failed to update disease category ${id}`
    );
  } catch (error) {
    return handleApiError(error, `editing disease category ${id}`);
  }
}

/**
 * Deletes a disease category
 * @param {string} id - Disease category ID
 * @returns {Promise<Object>} Deletion result
 */
export async function deleteDiseaseCategory(id) {
  try {
    const response = await api.delete(
      `${BASE_ENDPOINT}/${id}`,
      createAuthHeader()
    );
    return handleApiResponse(
      response,
      `Failed to delete disease category ${id}`
    );
  } catch (error) {
    return handleApiError(error, `deleting disease category ${id}`);
  }
}
