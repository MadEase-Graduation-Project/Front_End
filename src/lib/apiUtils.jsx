/**
 * API Utilities
 * Common utilities for API services
 */

export const createAuthHeader = () => ({});

/**
 ** Handles API response and extracts data
 * @param {Object} response - Axios response object
 * @param {string} errorMessage - Custom error message
 * @returns {Object|Array} Response data
 * @throws {Error} If data is not available
 */
export const handleApiResponse = (response, errorMessage) => {
  if (!response.data?.data) {
    throw new Error(errorMessage || "Invalid response from server");
  }

  return response.data.data;
};

/**
 ** Handles API errors consistently
 * @param {Error} error - Error object
 * @param {string} context - Context where error occurred
 * @returns {null} Returns null for backward compatibility
 */
export const handleApiError = (error, context) => {
  //console.error(`Error ${context}:`, error); //* for debugging purposes

  const errorObj = {
    message:
      error.response?.data?.message || error.message || `Failed to ${context}`,
    status: error.response?.status,
    context,
    originalError: error,
  };

  //ToDo: If you need to handle errors in future, you can return this error object for better error handling
  return null;
};
