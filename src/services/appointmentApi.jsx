import api from "../lib/axios";
import { handleApiResponse, handleApiError } from "../lib/apiUtils";

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
  const response = await api.get(`${BASE_ENDPOINT}/`);
  return handleApiResponse(response, "No appointments found");
}

/**
 * Gets a specific appointment by ID
 * @param {string} id - Appointment ID
 * @returns {Promise<Object>} Appointment details
 */
export async function showAppointment(id) {
  const response = await api.get(`${BASE_ENDPOINT}/${id}`);
  return handleApiResponse(response, `Appointment with id ${id} not found`);
}

/**
 * Adds a new appointment
 * @param {Object} appointmentData - New appointment data
 * @returns {Promise<Object>} Created appointment
 */
export async function addAppointment(doctorId, appointmentData) {
  const response = await api.post(
    `${BASE_ENDPOINT}/doctor/${doctorId}`,
    appointmentData
  );
  return handleApiResponse(response, "Failed to create appointment");
}

/**
 * Updates an existing appointment
 * @param {string} id - Appointment ID
 * @param {Object} appointmentData - Updated appointment data
 * @returns {Promise<Object>} Updated appointment
 */
export async function editAppointment(id, appointmentData) {
  const response = await api.put(`${BASE_ENDPOINT}/${id}`, appointmentData);
  return handleApiResponse(response, `Failed to update appointment ${id}`);
}

/**
 * Deletes user appointment
 * @param {string} id - Appointment ID
 * @returns {Promise<Object>} Deletion result
 */
export async function deleteUserAppointment(id) {
  const response = await api.delete(`${BASE_ENDPOINT}/user/${id}`);
  return handleApiResponse(response, `Failed to delete appointment ${id}`);
}

/**
 * Deletes Doctor appointment
 * @param {string} id - Appointment ID
 * @returns {Promise<Object>} Deletion result
 */
export async function deleteDoctorAppointment(id) {
  const response = await api.delete(`${BASE_ENDPOINT}/doctor/${id}`);
  return handleApiResponse(response, `Failed to delete appointment ${id}`);
}
