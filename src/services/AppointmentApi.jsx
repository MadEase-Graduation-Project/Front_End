import api from "./axios";
const baseEndpoint = "/appointment";
//! not ready
// all endpoints for the Appointments API

//* authorized endpoints
export async function getAllAppointments(token) {
  try {
    const response = await api.get(`${baseEndpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data?.data;
  } catch (error) {
    console.error("Error fetching appointments", error);
    return [];
  }
}

export async function showAppointment(id, token) {
  try {
    const response = await api.get(`${baseEndpoint}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data?.data;
  } catch (error) {
    console.error("Error fetching appointment", error);
    return [];
  }
}

export async function addAppointment(addedAppointment, token) {
  try {
    const response = await api.post(`${baseEndpoint}`, addedAppointment, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding appointment", error);
    return [];
  }
}

export async function editAppointment(id, editedAppointment, token) {
  try {
    const response = await api.put(`${baseEndpoint}/${id}`, editedAppointment, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error editing appointment", error);
    return [];
  }
}

export async function deleteAppointment(id, token) {
  try {
    const response = await api.delete(`${baseEndpoint}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting appointment", error);
    return [];
  }
}
