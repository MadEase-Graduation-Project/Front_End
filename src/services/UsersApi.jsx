import api from "./axios";
const baseEndpoint = "/user";

// all endpoints for the Users API

//* authorized endpoints
export async function getAllUsers(token) {
  try {
    const response = await api.get(`${baseEndpoint}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user", error);
    return [];
  }
}

export async function getUser(id, token) {
  try {
    const response = await api.get(`${baseEndpoint}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user", error);
    return [];
  }
}

export async function loginUser(user) {
  try {
    const response = await api.post(`${baseEndpoint}/login`, user);
    return response.data;
  } catch (error) {
    console.error("Error logging in user", error);
    return [];
  }
}

export async function registerUser(newUser) {
  try {
    const response = await api.post(`${baseEndpoint}/register`, newUser);
    return response.data;
  } catch (error) {
    console.error("Error registering user", error);
    return [];
  }
}
