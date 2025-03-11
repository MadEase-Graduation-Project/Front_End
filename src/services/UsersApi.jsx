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
    return response.data?.data;
  } catch (error) {
    console.error("Error fetching user", error);
    return [];
  }
}

export async function getAllPatients(token) {
  try {
    const response = await api.get(`${baseEndpoint}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const patients = response.data?.data.filter(
      (users) => users.role === "patient"
    );
    return patients || [];
  } catch (error) {
    console.error("Error fetching user", error);
    return [];
  }
}

export async function getAllDoctors(token) {
  try {
    const response = await api.get(`${baseEndpoint}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const doctors = response.data?.data.filter(
      (users) => users.role === "doctor"
    );
    return doctors || [];
  } catch (error) {
    console.error("Error fetching user", error);
    return [];
  }
}

export async function getAllNurses(token) {
  try {
    const response = await api.get(`${baseEndpoint}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const nurses = response.data?.data.filter(
      (users) => users.role === "nurse"
    );
    return nurses || [];
  } catch (error) {
    console.error("Error fetching user", error);
    return [];
  }
}

export async function getAllAdmins(token) {
  try {
    const response = await api.get(`${baseEndpoint}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const admins = response.data?.data.filter(
      (users) => users.role === "admin"
    );
    return admins || [];
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
    return response.data?.data;
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
    return { token: null };
  }
}

export async function registerUser(newUser) {
  try {
    const response = await api.post(`${baseEndpoint}/register`, newUser);
    return response.data?.data;
  } catch (error) {
    console.error("Error registering user", error);
    return [];
  }
}
