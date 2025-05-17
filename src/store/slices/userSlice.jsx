import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  deleteUser,
  getAllUsers,
  getOneUser,
  getUserData,
  updateUserData,
} from "@/services/usersApi";

export const fetchAllUsers = createAsyncThunk(
  "users/fetchAllUsers",
  async () => {
    return await getAllUsers();
  }
);

export const fetchUserData = createAsyncThunk(
  "users/fetchUserData",
  async () => {
    return await getUserData();
  }
);

export const fetchUserById = createAsyncThunk(
  "users/fetchUserById",
  async (id) => {
    return await getOneUser(id);
  }
);

export const removeUser = createAsyncThunk("users/removeUser", async (id) => {
  const response = await deleteUser(id);
  return response;
});

export const updateData = createAsyncThunk(
  "users/updateUserData",
  async (userData) => {
    const response = await updateUserData(userData);
    return response;
  }
);

const userSlice = createSlice({
  name: "users",
  initialState: {
    items: [],
    details: {},
    loading: false,
    error: null,
  },
  reducers: {
    clearSelectedUser: (state) => {
      state.details = {};
    },
  },
  extraReducers: (builder) => {
    builder
      // fetch all users
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // fetch user by id
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.details = action.payload;
        state.loading = false;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // fetch user data
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.details = action.payload;
        state.loading = false;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // remove user
      .addCase(removeUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeUser.fulfilled, (state) => {
        state.loading = false;
        state.details = {};
      })
      .addCase(removeUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // update user data
      .addCase(updateData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateData.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearSelectedUser } = userSlice.actions;
export default userSlice.reducer;
