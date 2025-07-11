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

export const removeUser = createAsyncThunk("users/removeUser", async () => {
  await deleteUser();
});

export const updateData = createAsyncThunk(
  "users/updateUserData",
  async (formData) => {
    return await updateUserData(formData);
  }
);

export const changeUserRoleThunk = createAsyncThunk(
  "users/changeUserRole",
  async ({ userId, newRole }) => {
    await changeUserRole(userId, { newRole });
    return newRole;
  }
);

export const rateUserThunk = createAsyncThunk(
  "users/rateUser",
  async ({ userId, rating }) => {
    await rateUser({ userId, rating });
    return rating;
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
    loadingMyData: false,
    // error
    error: false,
    errorMyData: false,
  },
  reducers: {
    clearSelectedUser: (state) => {
      state.userDetails = {};
      state.loading = false;
      state.error = false;
    },
    clearMyDetails: (state) => {
      state.myDetails = {};
      state.loadingMyData = false;
      state.errorMyData = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetch all users
      .addCase(fetchAllUsers.pending, pendingHandler())
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
        state.totalUsers = totalUsers;
        state.totalAdmin = totalAdmin;
        state.totalDoctors = totalDoctors;
        state.totalPatients = totalPatients;
        state.totalNurses = totalNurses;
        state.totalHospitals = totalHospitals;
        state.loading = false;
        state.error = false;
      })
      .addCase(fetchAllUsers.rejected, rejectedHandler())
      // fetch user by id
      .addCase(fetchUserById.pending, pendingHandler())
      .addCase(
        fetchUserById.fulfilled,
        fulfilledHandler({ detailsKey: "userDetails" })
      )
      .addCase(fetchUserById.rejected, rejectedHandler())
      // fetch user data
      .addCase(
        fetchMYData.pending,
        pendingHandler({ loadingKey: "loadingMyData", errorKey: "errorMyData" })
      )
      .addCase(
        fetchMYData.fulfilled,
        fulfilledHandler({
          detailsKey: "myDetails",
          loadingKey: "loadingMyData",
          errorKey: "errorMyData",
        })
      )
      .addCase(
        fetchMYData.rejected,
        rejectedHandler({
          loadingKey: "loadingMyData",
          errorKey: "errorMyData",
        })
      )
      // remove user
      .addCase(removeUser.pending, pendingHandler())
      .addCase(removeUser.fulfilled, (state) => {
        (state.loading = false), (state.error = false), (state.myDetails = {});
      })
      .addCase(removeUser.rejected, rejectedHandler())
      // update user data
      .addCase(updateData.pending, pendingHandler())
      .addCase(updateData.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.myDetails = action.payload;
      })
      .addCase(updateData.rejected, rejectedHandler())
      // change user role
      .addCase(changeUserRoleThunk.pending, pendingHandler())
      .addCase(changeUserRoleThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.userDetails = {
          ...state.userDetails,
          role: action.payload,
        };
      })
      .addCase(changeUserRoleThunk.rejected, rejectedHandler())
      // rate user
      .addCase(rateUserThunk.pending, pendingHandler())
      .addCase(rateUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.userDetails = {
          ...state.userDetails,
          rate: action.payload,
        };
      })
      .addCase(rateUserThunk.rejected, rejectedHandler());
  },
});

export const { clearSelectedUser, clearMyDetails } = userSlice.actions;
export default userSlice.reducer;
