import api from "./axios";
const baseEndpoint = "/advice";

// all endpoints for the Advices API

//* not authorized endpoints
export async function getAllAdvices() {
  try {
    const response = await api.get(`${baseEndpoint}`);
    if (!response.data?.data) {
      throw new Error("No data received from server");
    }
    return response.data?.data;
  } catch (error) {
    console.error("Error fetching advices", error);
    throw error;
  }
}

export async function showAdvice(id) {
  try {
    const response = await api.get(`${baseEndpoint}`);
    const advice = response.data?.data.find((advice) => advice._id === id);
    if (!advice) {
      throw new Error(`Advice with id ${id} not found`);
    }
    return advice;
  } catch (error) {
    console.error("Error fetching advice", error);
    throw error;
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
