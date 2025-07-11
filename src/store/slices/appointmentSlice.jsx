import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getAllAppointments,
  showAppointment,
  addAppointment,
  editAppointment,
  deleteUserAppointment,
  deleteDoctorAppointment,
} from "@/services/appointmentApi";
import {
  fulfilledHandler,
  pendingHandler,
  rejectedHandler,
} from "@/utils/casesHandlersUtils";

export const fetchAppointments = createAsyncThunk(
  "appointments/fetchAppointments",
  async () => {
    return await getAllAppointments();
  }
);

export const fetchAppointmentById = createAsyncThunk(
  "appointments/fetchAppointmentById",
  async (id, { dispatch }) => {
    dispatch(clearSelectedAppointment());
    return await showAppointment(id);
  }
);

export const createAppointment = createAsyncThunk(
  "appointments/createAppointment",
  async ({ doctorId, appointmentData }) => {
    return await addAppointment(doctorId, appointmentData);
  }
);

export const updateAppointment = createAsyncThunk(
  "appointments/updateAppointment",
  async ({ id, appointmentData }) => {
    return await editAppointment(id, appointmentData);
  }
);

export const removeUserAppointment = createAsyncThunk(
  "appointments/removeUserAppointment",
  async (id) => {
    await deleteUserAppointment(id);
    return id;
  }
);

export const removeDoctorAppointment = createAsyncThunk(
  "appointments/removeDoctorAppointment",
  async (id) => {
    await deleteDoctorAppointment(id);
    return id;
  }
);

const initialState = {
  // data
  appointments: [],
  selectedAppointment: {},
  // counts
  totalAppointments: 0,
  // loading
  loading: false,
  // error
  error: false,
};

const appointmentSlice = createSlice({
  name: "appointments",
  initialState,
  reducers: {
    clearSelectedAppointment: (state) => {
      state.selectedAppointment = {};
      state.loading = false;
      state.error = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all appointments
      .addCase(fetchAppointments.pending, pendingHandler())
      .addCase(fetchAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.appointments = action.payload?.data;
        state.totalAppointments = action.payload?.totalAppointments;
      })
      .addCase(fetchAppointments.rejected, rejectedHandler())

      // Fetch appointment by ID
      .addCase(fetchAppointmentById.pending, pendingHandler())
      .addCase(
        fetchAppointmentById.fulfilled,
        fulfilledHandler({ detailsKey: "selectedAppointment" })
      )
      .addCase(fetchAppointmentById.rejected, rejectedHandler())

      // Create appointment
      .addCase(createAppointment.pending, pendingHandler())
      .addCase(createAppointment.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.appointments.push(action.payload?.appointment);
      })
      .addCase(createAppointment.rejected, rejectedHandler())

      // Update appointment
      .addCase(updateAppointment.pending, pendingHandler())
      .addCase(
        updateAppointment.fulfilled,
        fulfilledHandler({ detailsKey: "selectedAppointment" })
      )
      .addCase(updateAppointment.rejected, rejectedHandler())

      // Remove user appointment
      .addCase(removeUserAppointment.pending, pendingHandler())
      .addCase(removeUserAppointment.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        const deletedId = action.payload;
        state.appointments = state.appointments.filter(
          (appointment) => appointment._id !== deletedId
        );
        if (state.selectedAppointment?._id === deletedId) {
          state.selectedAppointment = {};
        }
      })
      .addCase(removeUserAppointment.rejected, rejectedHandler())

      // Remove doctor appointment
      .addCase(removeDoctorAppointment.pending, pendingHandler())
      .addCase(removeDoctorAppointment.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        const deletedId = action.payload;
        state.appointments = state.appointments.filter(
          (appointment) => appointment._id !== deletedId
        );
        if (state.selectedAppointment?._id === deletedId) {
          state.selectedAppointment = {};
        }
      })
      .addCase(removeDoctorAppointment.rejected, rejectedHandler());
  },
});

export const { clearSelectedAppointment } = appointmentSlice.actions;
export default appointmentSlice.reducer;
