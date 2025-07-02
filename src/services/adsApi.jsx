import api from "../lib/axios";
import { handleApiResponse, handleApiError } from "../lib/apiUtils";

/**
 * Ads API Service
 * Handles all API calls related to Ads
 */

// Constants
const BASE_ENDPOINT = "/advertisements";

export const getAllAds = async ({page = 1} = {}) => {
  try {
    const response = await api.get(BASE_ENDPOINT, {params:{page}});
    return handleApiResponse(response);
  } catch (error) {
    return handleApiError(error);
  }
};

export const getAdById = async (id) => {
  try {
    const response = await api.get(`${BASE_ENDPOINT}/${id}`);
    return handleApiResponse(response);
  } catch (error) {
    return handleApiError(error);
  }
};

// Add new ad
export const addAd = async (adData) => {
  try {
    const response = await api.post(BASE_ENDPOINT, adData);
    return handleApiResponse(response, "Failed to add ad");
  } catch (error) {
    return handleApiError(error, "adding ad");
  }
};

// Update ad
export const updateAd = async (id, adData) => {
  try {
    const response = await api.put(`${BASE_ENDPOINT}/${id}`, adData);
    return handleApiResponse(response, "Failed to update ad");
  } catch (error) {
    return handleApiError(error, "updating ad");
  }
};

// Delete ad
export const deleteAd = async (id) => {
  try {
    const response = await api.delete(`${BASE_ENDPOINT}/${id}`);
    return handleApiResponse(response, "Failed to delete ad");
  } catch (error) {
    return handleApiError(error, "deleting ad");
  }
};


