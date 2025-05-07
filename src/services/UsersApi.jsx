import api from "./axios";
import {
  createAuthHeader,
  handleApiResponse,
  handleApiError,
} from "./apiUtils";

/**
 * Users API Service
 * Handles all API calls related to users
 */

// Constants
const BASE_ENDPOINT = "/users";

/**
 * Gets all users
 * @returns {Promise<Array>} List of users
 */
export async function getAllUsers() {
  try {
    const response = await api.get(`${BASE_ENDPOINT}/`, createAuthHeader());
    return handleApiResponse(response, "No users found");
  } catch (error) {
    return handleApiError(error, "fetching users");
  }
}

/**
 * Gets a specific user by ID
 * @param {string} id - User ID
 * @returns {Promise<Object>} User details
 */
export async function getOneUser(id) {
  try {
    const response = await api.get(`${BASE_ENDPOINT}/`, createAuthHeader());
    const data = handleApiResponse(response, "No users found");

    const user = data.find((user) => user._id === id);
    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }

    return user;
  } catch (error) {
    return handleApiError(error, `fetching user ${id}`);
  }
}

/**
 * Gets all patients
 * @returns {Promise<Array>} List of patients
 */
export async function getAllPatients() {
  try {
    const response = await api.get(`${BASE_ENDPOINT}/`, createAuthHeader());
    const data = handleApiResponse(response, "No users found");

    const patients = data.filter((user) => user.role === "Patient");
    return patients;
  } catch (error) {
    return handleApiError(error, "fetching patients");
  }
}

/**
 * Gets all doctors
 * @returns {Promise<Array>} List of doctors
 */
export async function getAllDoctors() {
  try {
    const response = await api.get(`${BASE_ENDPOINT}/`, createAuthHeader());
    const data = handleApiResponse(response, "No users found");

    const doctors = data.filter((user) => user.role === "Doctor");
    return doctors;
  } catch (error) {
    return handleApiError(error, "fetching doctors");
  }
}

/**
 * Gets all nurses
 * @returns {Promise<Array>} List of nurses
 */
export async function getAllNurses() {
  try {
    const response = await api.get(`${BASE_ENDPOINT}/`, createAuthHeader());
    const data = handleApiResponse(response, "No users found");

    const nurses = data.filter((user) => user.role === "Nurse");
    return nurses;
  } catch (error) {
    return handleApiError(error, "fetching nurses");
  }
}

/**
 * Gets all admins
 * @returns {Promise<Array>} List of admins
 */
export async function getAllAdmins() {
  try {
    const response = await api.get(`${BASE_ENDPOINT}/`, createAuthHeader());
    const data = handleApiResponse(response, "No users found");

    const admins = data.filter((user) => user.role === "Admin");
    return admins;
  } catch (error) {
    return handleApiError(error, "fetching admins");
  }
}

/**
 * Gets current user data
 * @returns {Promise<Object>} Current user data
 */
export async function getUserData() {
  try {
    const response = await api.get(`${BASE_ENDPOINT}/one`, createAuthHeader());
    return handleApiResponse(response, "Failed to get user data");
  } catch (error) {
    return handleApiError(error, "fetching user data");
  }
}

/**
 * Logs in a user
 * @param {Object} credentials - User credentials
 * @returns {Promise<Object>} Login response with token
 */
export async function loginUser(credentials) {
  try {
    const response = await api.post(`${BASE_ENDPOINT}/login`, credentials);

    if (!response.data) {
      throw new Error("Invalid login response");
    }

    return response.data;
  } catch (error) {
    console.error("Error logging in user:", error);
    return { token: null };
  }
}

/**
 * Registers a new user
 * @param {Object} userData - New user data
 * @returns {Promise<Object>} Registration response
 */
export async function registerUser(userData) {
  try {
    const response = await api.post(`${BASE_ENDPOINT}/register`, userData);
    return handleApiResponse(response, "Failed to register user");
  } catch (error) {
    return handleApiError(error, "registering user");
  }
}

/**
 * Updates user data
 * @param {Object} userData - Updated user data
 * @returns {Promise<Object>} Updated user data
 */
export async function updateUserData(userData) {
  try {
    const response = await api.patch(
      `${BASE_ENDPOINT}`,
      userData,
      createAuthHeader()
    );
    return handleApiResponse(response, "Failed to update user data");
  } catch (error) {
    return handleApiError(error, "updating user data");
  }
}

/**
 * Deletes a user
 * @param {string} userId - User ID
 * @returns {Promise<Object>} Delete response
 */
export async function deleteUser(userId) {
  try {
    const response = await api.delete(
      `${BASE_ENDPOINT}/${userId}`,
      createAuthHeader()
    );
    return handleApiResponse(response, "Failed to delete user");
  } catch (error) {
    return handleApiError(error, "deleting user");
  }
}
