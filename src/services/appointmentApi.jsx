import api from "../lib/axios";
import {
  createAuthHeader,
  handleApiResponse,
  handleApiError,
} from "../lib/apiUtils";

/**
 * Appointments API Service
 * Handles all API calls related to appointments
 */

// Constants
const BASE_ENDPOINT = "/appointments";

/**
 * Gets all appointments
 * @returns {Promise<Array>} List of appointments
 */
export async function getAllAppointments() {
  try {
    const response = await api.get(`${BASE_ENDPOINT}/`, createAuthHeader());
    return handleApiResponse(response, "No appointments found");
  } catch (error) {
    return handleApiError(error, "fetching appointments");
  }
}

/**
 * Gets a specific appointment by ID
 * @param {string} id - Appointment ID
 * @returns {Promise<Object>} Appointment details
 */
export async function showAppointment(id) {
  try {
    const response = await api.get(
      `${BASE_ENDPOINT}/${id}`,
      createAuthHeader()
    );
    return handleApiResponse(response, `Appointment with id ${id} not found`);
  } catch (error) {
    return handleApiError(error, `fetching appointment ${id}`);
  }
}

// TODO: look create endpoint and edit that
/**
 * Adds a new appointment
 * @param {Object} appointmentData - New appointment data
 * @returns {Promise<Object>} Created appointment
 */
export async function addAppointment(appointmentData) {
  try {
    const response = await api.post(
      BASE_ENDPOINT,
      appointmentData,
      createAuthHeader()
    );
    return handleApiResponse(response, "Failed to create appointment");
  } catch (error) {
    return handleApiError(error, "adding appointment");
  }
}

/**
 * Updates an existing appointment
 * @param {string} id - Appointment ID
 * @param {Object} appointmentData - Updated appointment data
 * @returns {Promise<Object>} Updated appointment
 */
export async function editAppointment(id, appointmentData) {
  try {
    const response = await api.put(
      `${BASE_ENDPOINT}/${id}`,
      appointmentData,
      createAuthHeader()
    );
    return handleApiResponse(response, `Failed to update appointment ${id}`);
  } catch (error) {
    return handleApiError(error, `editing appointment ${id}`);
  }
}

/**
 * Deletes an appointment
 * @param {string} id - Appointment ID
 * @returns {Promise<Object>} Deletion result
 */
export async function deleteAppointment(id) {
  try {
    const response = await api.delete(
      `${BASE_ENDPOINT}/user/${id}`,
      createAuthHeader()
    );
    return handleApiResponse(response, `Failed to delete appointment ${id}`);
  } catch (error) {
    return handleApiError(error, `deleting appointment ${id}`);
  }
}
