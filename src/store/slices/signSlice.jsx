import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  loginUser,
  registerUser,
  logoutUser,
} from "../../services/signUserApi";
import { pendingHandler, rejectedHandler } from "@/utils/casesHandlersUtils";
import { clearMyDetails } from "./userSlice";

// Async thunks
export const login = createAsyncThunk(
  "sign/login",
  async (credentials, { dispatch }) => {
    dispatch(resetSignState());
    const response = await loginUser(credentials);
    return response;
  }
);

export const register = createAsyncThunk("sign/register", async (userData) => {
  const response = await registerUser(userData);
  return response;
});

export const logout = createAsyncThunk(
  "sign/logout",
  async (_, { dispatch }) => {
    dispatch(resetSignState());
    dispatch(clearMyDetails());
    const response = await logoutUser();
    return response;
  }
);

const initialState = {
  user: null,
  role: null,
  loading: false,
  error: false,
};

const signSlice = createSlice({
  name: "sign",
  initialState,
  reducers: {
    resetSignState: (state) => {
      state.user = null;
      state.role = null;
      state.loading = false;
      state.error = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, pendingHandler())
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.role = action.payload?.Role;
      })
      .addCase(login.rejected, rejectedHandler())
      // Register
      .addCase(register.pending, pendingHandler())
      .addCase(register.fulfilled, (state) => {
        state.loading = false;
        state.error = false;
      })
      .addCase(register.rejected, rejectedHandler())
      // Logout
      .addCase(logout.pending, pendingHandler())
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.error = false;
        state.role = null;
        state.user = null;
      })
      .addCase(logout.rejected, rejectedHandler());
  },
});

export const { resetSignState } = signSlice.actions;
export default signSlice.reducer;
