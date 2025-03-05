import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllUsers, getUser } from "../../services/UsersApi";

export const fetchAllUsers = createAsyncThunk(
  "users/fetchUsers",
  async (token) => {
    return await getAllUsers(token);
  }
);

export const fetchUserById = createAsyncThunk(
  "users/fetchUserById",
  async ({ id, token }) => {
    return await getUser(id, token);
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState: {
    items: [],
    selectedUser: {},
    loading: false,
    error: null,
  },
  reducers: {
    clearSelectedUser: (state) => {
      state.selectedUser = {};
    },
  },
  extraReducers: (builder) => {
    builder
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
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.selectedUser = action.payload;
        state.loading = false;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearSelectedUser } = usersSlice.actions;
export default usersSlice.reducer;
