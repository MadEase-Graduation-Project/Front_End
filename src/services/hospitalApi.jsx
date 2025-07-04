import api from "../lib/axios";
import { handleApiResponse } from "../lib/apiUtils";

/**
 * Hospitals API Service
 * Handles all API calls related to Hospitals
 */

// Constants
const BASE_ENDPOINT = "/users/hospitals";

export const getAllHospitals = async ({ page = 1 } = {}) => {
  const response = await api.get(`${BASE_ENDPOINT}`, { params: { page } });
  return handleApiResponse(response, "no hospitals found");
};

export const showHospital = async ({ name } = {}) => {
  const response = await api.get(`${BASE_ENDPOINT}`, { params: { name } });
  return handleApiResponse(response, "no hospital at this name found");
};
