import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllUsers, getOneUser, getUserData } from "../../services/UsersApi";

export const fetchAllUsers = createAsyncThunk(
  "users/fetchAllUsers",
  async (token) => {
    return await getAllUsers(token);
  }
);

export const fetchUserData = createAsyncThunk(
  "users/fetchUserData",
  async (token) => {
    return await getUserData(token);
  }
);

export const fetchUserById = createAsyncThunk(
  "users/fetchUserById",
  async ({ token, id }) => {
    return await getOneUser(token, id);
  }
);

const usersSlice = createSlice({
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
        state.loading = false;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearSelectedUser } = usersSlice.actions;
export default usersSlice.reducer;
