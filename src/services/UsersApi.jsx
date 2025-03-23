import api from "./axios";
const baseEndpoint = "/users";

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

export async function getOneUser(token, id) {
  try {
    const response = await api.get(`${baseEndpoint}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const user = response.data?.data.filter((users) => users._id === id);
    return user || [];
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
      (users) => users.role === "Patient"
    );
    return patients || [];
  } catch (error) {
    console.error("Error fetching patients", error);
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
      (users) => users.role === "Doctor"
    );
    return doctors || [];
  } catch (error) {
    console.error("Error fetching doctors", error);
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
      (users) => users.role === "Nurse"
    );
    return nurses || [];
  } catch (error) {
    console.error("Error fetching nurses", error);
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
      (users) => users.role === "Admin"
    );
    return admins || [];
  } catch (error) {
    console.error("Error fetching admins", error);
    return [];
  }
}

export async function getUserData(token) {
  try {
    const response = await api.get(`${baseEndpoint}/one`, {
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
