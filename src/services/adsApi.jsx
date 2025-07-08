import api from "../lib/axios";
import { handleApiResponse, handleApiError } from "../lib/apiUtils";

/**
 * Ads API Service
 * Handles all API calls related to Ads
 */

// Constants
const BASE_ENDPOINT = "/advertisements";

export const getAllAds = async ({ page = 1 } = {}) => {
  const response = await api.get(BASE_ENDPOINT, { params: { page } });
  return handleApiResponse(response);
};

export const getAdById = async (id) => {
  const response = await api.get(`${BASE_ENDPOINT}/${id}`);
  return handleApiResponse(response);
};

// Add new ad
export const addAd = async (adData) => {
  const response = await api.post(BASE_ENDPOINT, adData, {
    headers: {
      "Content-Type": "multipart/form-data", // ✅ Correct for FormData
    },
  });
  return handleApiResponse(response, "Failed to add ad");
};

// Update ad
export const updateAd = async (id, adData) => {
  const response = await api.put(`${BASE_ENDPOINT}/${id}`, adData);
  return handleApiResponse(response, "Failed to update ad");
};

// Delete ad
export const deleteAd = async (id) => {
  const response = await api.delete(`${BASE_ENDPOINT}/${id}`);
  return handleApiResponse(response, "Failed to delete ad");
};
