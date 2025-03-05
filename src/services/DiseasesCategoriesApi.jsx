import api from "./axios";
const baseEndpoint = "/diseasescategory";

// all endpoints for the Disease Categories API

//* authorized endpoints
export async function getAllDiseaseCategories(token) {
  try {
    const response = await api.get(`${baseEndpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data?.data;
  } catch (error) {
    console.error("Error fetching disease categories", error);
    return [];
  }
}

export async function showDiseaseCategory(id, token) {
  try {
    const response = await api.get(`${baseEndpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // Filter the diseasesCategories array to find the one matching the id
    const diseaseCategory = response.data?.data.find(
      (diseasesCategory) => diseasesCategory._id === id
    );
    return diseaseCategory || null;
  } catch (error) {
    console.error("Error fetching disease category", error);
    return [];
  }
}

export async function addDiseaseCategory(addedCategory, token) {
  try {
    const response = await api.post(`${baseEndpoint}`, addedCategory, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding disease category", error);
    return [];
  }
}

export async function editDiseaseCategory(id, editedCategory, token) {
  try {
    const response = await api.put(`${baseEndpoint}/${id}`, editedCategory, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error editing disease category", error);
    return [];
  }
}

export async function deleteDiseaseCategory(id, token) {
  try {
    const response = await api.delete(`${baseEndpoint}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting disease category", error);
    return [];
  }
}
