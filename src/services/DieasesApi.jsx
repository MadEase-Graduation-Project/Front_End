import api from "./axios";
const baseEndpoint = "/diseases";

// all endpoints for the Diseases API

//* authorized endpoints
export async function getAllDiseases(token) {
  try {
    const response = await api.get(`${baseEndpoint}`, {
      Headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching diseases", error);
    return [];
  }
}

export async function showDisease(id, token) {
  try {
    const response = await api.get(`${baseEndpoint}/${id}`, {
      Headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching disease", error);
    return [];
  }
}

export async function addDisease(addedDisease, token) {
  try {
    const response = await api.post(`${baseEndpoint}`, addedDisease, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding disease", error);
    return [];
  }
}

export async function editDisease(id, editedDisease, token) {
  try {
    const response = await api.put(`${baseEndpoint}/${id}`, editedDisease, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error editing disease", error);
    return [];
  }
}

export async function deleteDisease(id, token) {
  try {
    const response = await api.delete(`${baseEndpoint}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting disease", error);
    return [];
  }
}
