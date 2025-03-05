import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getAllAppointments,
  showAppointment,
} from "../../services/AppointmentApi";

export const fetchAppointments = createAsyncThunk(
  "appointments/fetchAppointments",
  async (token) => {
    return await getAllAppointments(token);
  }
);

export const fetchAppointmentById = createAsyncThunk(
  "appointments/fetchAppointmentById",
  async ({ id, token }) => {
    return await showAppointment(id, token);
  }
);

const appointmentsSlice = createSlice({
  name: "appointments",
  initialState: {
    items: [],
    selectedAppointment: {},
    loading: false,
    error: null,
  },
  reducers: {
    clearSelectedAppointment: (state) => {
      state.selectedAppointment = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppointments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAppointments.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchAppointmentById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAppointmentById.fulfilled, (state, action) => {
        state.selectedAppointment = action.payload;
        state.loading = false;
      })
      .addCase(fetchAppointmentById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearSelectedUser } = appointmentsSlice.actions;
export default appointmentsSlice.reducer;
