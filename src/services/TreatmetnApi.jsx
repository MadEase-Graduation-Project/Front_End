import api from "./axios";
const baseEndpoint = "/treatment";

// all endpoints for the Advices API

//* authorized endpoints
export async function getAllTreatments(token) {
  try {
    const response = await api.get(`${baseEndpoint}`, {
      Headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching advices", error);
    return [];
  }
}

export async function showTreatment(id, token) {
  try {
    const response = await api.get(`${baseEndpoint}/${id}`, {
      Headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching advices", error);
    return [];
  }
}

export async function addTreatment(addedTreatment, token) {
  try {
    const response = await api.post(`${baseEndpoint}`, addedTreatment, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding advice", error);
    return [];
  }
}
export async function editTreatment(id, editedTreatment, token) {
  try {
    const response = await api.put(`${baseEndpoint}/${id}`, editedTreatment, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error editing treatment", error);
    return [];
  }
}

export async function deleteTreatment(id, token) {
  try {
    const response = await api.delete(`${baseEndpoint}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting treatment", error);
    return [];
  }
}
//----------------------------------------------
