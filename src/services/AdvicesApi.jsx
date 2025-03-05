import api from "./axios";
const baseEndpoint = "/advice";

// all endpoints for the Advices API

//* not authorized endpoints
export async function getAllAdvices() {
  try {
    const response = await api.get(`${baseEndpoint}`);
    return response.data?.data;
  } catch (error) {
    console.error("Error fetching advices", error);
    return [];
  }
}

export async function showAdvice(id) {
  try {
    const response = await api.get(`${baseEndpoint}`);
    // filter the advices array to find the one matching the id
    const advice = response.data?.data.find((advice) => advice._id === id);
    return advice || null;
  } catch (error) {
    console.error("Error fetching advices", error);
    return [];
  }
}
//----------------------------------------------

//* authorized endpoints
export async function addAdvice(addedAdvice, token) {
  try {
    const response = await api.post(baseEndpoint, addedAdvice, {
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

export async function editAdvice(id, editedAdvice, token) {
  try {
    const response = await api.put(`${baseEndpoint}/${id}`, editedAdvice, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error editing advice", error);
    return [];
  }
}

export async function deleteAdvice(id, token) {
  try {
    const response = await api.delete(`${baseEndpoint}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting advice", error);
    return [];
  }
}
//----------------------------------------------
