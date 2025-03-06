import api from "./axios";
const baseEndpoint = "/diseases";

// all endpoints for the Diseases API

//* authorized endpoints
export async function getAllDiseases(token) {
  try {
    const response = await api.get(`${baseEndpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data?.data;
  } catch (error) {
    console.error("Error fetching diseases is ...........", error);
    return [];
  }
}

export async function showDisease(id, token) {
  try {
    const response = await api.get(`${baseEndpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // Filter the diseases array to find the one matching the id
    const disease = response.data?.data.find((disease) => disease._id === id);
    return disease || null;
  } catch (error) {
    console.error("Error fetching disease", error.response?.data);
    return null; // Changed from [] to null to be consistent with the success case
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
