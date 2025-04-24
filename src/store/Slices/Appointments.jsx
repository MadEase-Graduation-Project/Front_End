import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getAllAppointments,
  showAppointment,
  addAppointment,
  editAppointment,
  deleteAppointment,
} from "../../services/AppointmentApi";

export const fetchAppointments = createAsyncThunk(
  "appointments/fetchAppointments",
  async () => {
    return await getAllAppointments();
  }
);

export const fetchAppointmentById = createAsyncThunk(
  "appointments/fetchAppointmentById",
  async (id) => {
    return await showAppointment(id);
  }
);

export const createAppointment = createAsyncThunk(
  "appointments/createAppointment",
  async (appointmentData, { dispatch }) => {
    const response = await addAppointment(appointmentData);
    // Refresh the appointments list after adding
    if (response) {
      dispatch(fetchAppointments());
    }
    return response;
  }
);

export const updateAppointment = createAsyncThunk(
  "appointments/updateAppointment",
  async ({ id, appointmentData }, { dispatch }) => {
    const response = await editAppointment(id, appointmentData);
    // Refresh the appointments list after updating
    if (response) {
      dispatch(fetchAppointments());
    }
    return response;
  }
);

export const removeAppointment = createAsyncThunk(
  "appointments/removeAppointment",
  async (id, { dispatch }) => {
    const response = await deleteAppointment(id);
    // Refresh the appointments list after deleting
    if (response) {
      dispatch(fetchAppointments());
    }
    return response;
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
      // Fetch all appointments
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

      // Fetch appointment by ID
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
      })

      // Create appointment
      .addCase(createAppointment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAppointment.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Update appointment
      .addCase(updateAppointment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAppointment.fulfilled, (state, action) => {
        state.loading = false;
        // Update the selected appointment if it's the one being edited
        if (
          state.selectedAppointment &&
          state.selectedAppointment._id === action.payload?._id
        ) {
          state.selectedAppointment = action.payload;
        }
      })
      .addCase(updateAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Remove appointment
      .addCase(removeAppointment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeAppointment.fulfilled, (state) => {
        state.loading = false;
        // Clear selected appointment if it was deleted
        state.selectedAppointment = {};
      })
      .addCase(removeAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearSelectedAppointment } = appointmentsSlice.actions;
export default appointmentsSlice.reducer;
