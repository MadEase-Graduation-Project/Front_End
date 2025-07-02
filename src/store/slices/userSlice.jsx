import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllUsers, getMyData, getOneUser } from "@/services/userApi";
import {
  deleteUser,
  updateUserData,
  changeUserRole,
  rateUser,
} from "@/services/editUserApi";
import {
  fulfilledHandler,
  pendingHandler,
  rejectedHandler,
} from "@/utils/casesHandlersUtils";

export const fetchAllUsers = createAsyncThunk(
  "users/fetchAllUsers",
  async () => {
    return await getAllUsers();
  }
);

export const fetchMYData = createAsyncThunk("users/fetchMyData", async () => {
  return await getMyData();
});

export const fetchUserById = createAsyncThunk(
  "users/fetchUserById",
  async (id, { dispatch }) => {
    dispatch(clearSelectedUser());
    return await getOneUser(id);
  }
);

export const removeUser = createAsyncThunk("users/removeUser", async (id) => {
  return await deleteUser(id);
});

export const updateData = createAsyncThunk(
  "users/updateUserData",
  async (userData) => {
    return await updateUserData(userData);
  }
);

export const changeUserRoleThunk = createAsyncThunk(
  "users/changeUserRole",
  async ({ userId, newRole }) => {
    return await changeUserRole(userId, { newRole });
  }
);

export const rateUserThunk = createAsyncThunk(
  "users/rateUser",
  async ({ userId, rating }) => {
    return await rateUser({ userId, rating });
  }
);

const userSlice = createSlice({
  name: "users",
  initialState: {
    // data
    users: [],
    myDetails: {},
    userDetails: {},
    // counts
    totalUsers: 0,
    totalAdmin: 0,
    totalDoctors: 0,
    totalPatients: 0,
    totalNurses: 0,
    totalHospitals: 0,
    // loading
    loading: false,
    // error
    error: null,
  },
  reducers: {
    clearSelectedUser: (state) => {
      state.userDetails = {};
      state.loading = false;
      state.error = null;
    },
    clearMyDetails: (state) => {
      state.myDetails = {};
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetch all users
      .addCase(fetchAllUsers.pending, (state) => {
        state.loadingMore = true;
        state.error = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        const {
          data,
          totalUsers,
          totalAdmin,
          totalDoctors,
          totalPatients,
          totalNurses,
          totalHospitals,
        } = action.payload;

        state.users = data;
        state.loading = false;
        state.totalUsers = totalUsers;
        state.totalAdmin = totalAdmin;
        state.totalDoctors = totalDoctors;
        state.totalPatients = totalPatients;
        state.totalNurses = totalNurses;
        state.totalHospitals = totalHospitals;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // fetch user by id
      .addCase(fetchUserById.pending, pendingHandler())
      .addCase(
        fetchUserById.fulfilled,
        fulfilledHandler({ detailsKey: "userDetails" })
      )
      .addCase(fetchUserById.rejected, rejectedHandler())
      // fetch user data
      .addCase(fetchMYData.pending, pendingHandler())
      .addCase(
        fetchMYData.fulfilled,
        fulfilledHandler({ detailsKey: "myDetails" })
      )
      .addCase(fetchMYData.rejected, rejectedHandler())
      // remove user
      .addCase(removeUser.pending, pendingHandler())
      .addCase(removeUser.fulfilled, fulfilledHandler())
      .addCase(removeUser.rejected, rejectedHandler())
      // update user data
      .addCase(updateData.pending, pendingHandler())
      .addCase(updateData.fulfilled, fulfilledHandler())
      .addCase(updateData.rejected, rejectedHandler())
      // change user role
      .addCase(changeUserRoleThunk.pending, pendingHandler())
      .addCase(changeUserRoleThunk.fulfilled, fulfilledHandler())
      .addCase(changeUserRoleThunk.rejected, rejectedHandler())
      // rate user
      .addCase(rateUserThunk.pending, pendingHandler())
      .addCase(rateUserThunk.fulfilled, fulfilledHandler())
      .addCase(rateUserThunk.rejected, rejectedHandler());
  },
});

export const { clearSelectedUser, clearMyDetails } = userSlice.actions;
export default userSlice.reducer;
