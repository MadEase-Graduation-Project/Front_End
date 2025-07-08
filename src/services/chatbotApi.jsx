import api from "../lib/axios";
import { handleApiResponse } from "../lib/apiUtils";

/**
 * Appointments API Service
 * Handles all API calls related to appointments
 */

// Constants
const BASE_ENDPOINT = "/ai";

export async function startSession() {
  const response = await api.post(`${BASE_ENDPOINT}/start_session`);
  return handleApiResponse(response, "can't start session");
}

// body >> {session_id , user_input}
export async function sendMsg(body) {
  const response = await api.post(`${BASE_ENDPOINT}/send_message`, body);
  return handleApiResponse(response, "can't send msg");
}

export async function allSymptoms() {
  const response = await api.get(`${BASE_ENDPOINT}/symptoms`);
  return handleApiResponse(response, "can't get symptoms");
}
