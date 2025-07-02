import api from "../lib/axios";
import { handleApiResponse, handleApiError } from "../lib/apiUtils";

/**
 * Hospitals API Service
 * Handles all API calls related to Hospitals
 */

// Constants
const BASE_ENDPOINT = "/users/hospitals";

export const getAllHospitals = async ({ page = 1 } = {}) => {
  try {
    const response = await api.get(`${BASE_ENDPOINT}`, { params: { page } });
    return handleApiResponse(response, "no hospitals found");
  } catch (error) {
    return handleApiError(error);
  }
};

export const showHospital = async ({ name } = {}) => {
  try {
    const response = await api.get(`${BASE_ENDPOINT}`, { params: { name } });
    return handleApiResponse(response, "no hospital at this name found");
  } catch (error) {
    return handleApiError(error);
  }
};
