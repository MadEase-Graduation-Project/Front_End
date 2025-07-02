import api from "../lib/axios";
import { handleApiResponse, handleApiError } from "../lib/apiUtils";

/**
 * Diagnosis API Service
 * Handles all API calls related to diagnosis.
 */

// Constants
const BASE_ENDPOINT = "/diagnosis";

// Get all diagnosis with pagination
export const getAllDiagnosis = async (patient_id) => {
  try {
    const response = await api.get(`${BASE_ENDPOINT}/${patient_id}/all`);
    return handleApiResponse(response);
  } catch (error) {
    return handleApiError(error);
  }
};

// Get diagnosis by ID
export const getDiagnosisById = async (patient_id, diagnose_id) => {
  try {
    const response = await api.get(
      `${BASE_ENDPOINT}/${patient_id}/${diagnose_id}`
    );
    return handleApiResponse(response);
  } catch (error) {
    return handleApiError(error);
  }
};

// Add diagnosis
export const addDiagnosis = async (diagnosisData) => {
  try {
    const response = await api.post(BASE_ENDPOINT, diagnosisData);
    return handleApiResponse(response, "Failed to add diagnosis");
  } catch (error) {
    return handleApiError(error, "adding diagnosis");
  }
};

// Update diagnosis
export const updateDiagnosis = async (
  patient_id,
  diagnose_id,
  diagnosisData
) => {
  try {
    const response = await api.put(
      `${BASE_ENDPOINT}/${patient_id}/${diagnose_id}`,
      diagnosisData
    );
    return handleApiResponse(response, "Failed to update diagnosis");
  } catch (error) {
    return handleApiError(error, "updating diagnosis");
  }
};

// Delete diagnosis
export const deleteDiagnosis = async (patient_id, diagnose_id) => {
  try {
    const response = await api.delete(
      `${BASE_ENDPOINT}/${patient_id}/${diagnose_id}`
    );
    return handleApiResponse(response, "Failed to delete diagnosis");
  } catch (error) {
    return handleApiError(error, "deleting diagnosis");
  }
};
