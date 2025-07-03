import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  loginUser,
  registerUser,
  logoutUser,
} from "../../services/signUserApi";

// Async thunks
export const login = createAsyncThunk("sign/login", async (credentials) => {
  const response = await loginUser(credentials);
  return response;
});

export const register = createAsyncThunk("sign/register", async (userData) => {
  const response = await registerUser(userData);
  return response;
});

export const logout = createAsyncThunk("sign/logout", async () => {
  const response = await logoutUser();
  return response;
});

const initialState = {
  user: null,
  role: null,
  loading: false,
  error: null,
};

const signSlice = createSlice({
  name: "sign",
  initialState,
  reducers: {
    resetSignState: (state) => {
      state.user = null;
      state.role = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.role = action.payload?.Role;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Register
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Logout
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.error = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { resetSignState } = signSlice.actions;
export default signSlice.reducer;
