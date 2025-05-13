import { createSelector } from '@reduxjs/toolkit';

// Basic selectors
const selectAppointmentsState = state => state.appointments;
export const selectAllAppointments = state => selectAppointmentsState(state).items;
export const selectAppointmentsLoading = state => selectAppointmentsState(state).loading;
export const selectAppointmentsError = state => selectAppointmentsState(state).error;
export const selectSelectedAppointment = state => selectAppointmentsState(state).selectedAppointment;

// Memoized selectors
export const selectFilteredAppointments = createSelector(
  [
    selectAllAppointments, 
    (state, searchQuery) => searchQuery,
    (state, _, status) => status,
    (state, _, __, startDate) => startDate,
    (state, _, __, ___, endDate) => endDate
  ],
  (appointments, searchQuery, status, startDate, endDate) => {
    if (!appointments || appointments.length === 0) return [];

    let filtered = [...appointments];

    // Filter by search query
    if (searchQuery && searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (appointment) =>
          (appointment.patientName && appointment.patientName.toLowerCase().includes(query)) ||
          (appointment.doctorName && appointment.doctorName.toLowerCase().includes(query)) ||
          (appointment.reason && appointment.reason.toLowerCase().includes(query))
      );
    }

    // Filter by status
    if (status && status !== "All") {
      filtered = filtered.filter(
        (appointment) => appointment.status === status
      );
    }

    // Filter by date range
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      
      filtered = filtered.filter(appointment => {
        const appointmentDate = new Date(appointment.date);
        return appointmentDate >= start && appointmentDate <= end;
      });
    } else if (startDate) {
      const start = new Date(startDate);
      
      filtered = filtered.filter(appointment => {
        const appointmentDate = new Date(appointment.date);
        return appointmentDate >= start;
      });
    } else if (endDate) {
      const end = new Date(endDate);
      
      filtered = filtered.filter(appointment => {
        const appointmentDate = new Date(appointment.date);
        return appointmentDate <= end;
      });
    }

    return filtered;
  }
);

// Get appointment by ID
export const makeSelectAppointmentById = () => 
  createSelector(
    [selectAllAppointments, (_, appointmentId) => appointmentId],
    (appointments, appointmentId) => appointments.find(appointment => appointment._id === appointmentId)
  );

// Get appointments by doctor ID
export const selectAppointmentsByDoctorId = createSelector(
  [selectAllAppointments, (_, doctorId) => doctorId],
  (appointments, doctorId) => {
    return appointments.filter(appointment => appointment.doctorId === doctorId);
  }
);

// Get appointments by patient ID
export const selectAppointmentsByPatientId = createSelector(
  [selectAllAppointments, (_, patientId) => patientId],
  (appointments, patientId) => {
    return appointments.filter(appointment => appointment.patientId === patientId);
  }
);

// Get appointments by status
export const selectAppointmentsByStatus = createSelector(
  [selectAllAppointments, (_, status) => status],
  (appointments, status) => {
    if (!status || status === "All") return appointments;
    return appointments.filter(appointment => appointment.status === status);
  }
);

// Get appointments by date
export const selectAppointmentsByDate = createSelector(
  [selectAllAppointments, (_, date) => date],
  (appointments, date) => {
    if (!date) return appointments;
    
    const targetDate = new Date(date);
    const year = targetDate.getFullYear();
    const month = targetDate.getMonth();
    const day = targetDate.getDate();
    
    return appointments.filter(appointment => {
      const appointmentDate = new Date(appointment.date);
      return (
        appointmentDate.getFullYear() === year &&
        appointmentDate.getMonth() === month &&
        appointmentDate.getDate() === day
      );
    });
  }
);

// Get upcoming appointments
export const selectUpcomingAppointments = createSelector(
  [selectAllAppointments],
  (appointments) => {
    const now = new Date();
    
    return appointments
      .filter(appointment => {
        const appointmentDate = new Date(appointment.date);
        return appointmentDate > now;
      })
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  }
);

// Get appointment counts by status
export const selectAppointmentCountsByStatus = createSelector(
  [selectAllAppointments],
  (appointments) => {
    const counts = {
      scheduled: 0,
      completed: 0,
      cancelled: 0,
      noShow: 0
    };
    
    appointments.forEach(appointment => {
      const status = appointment.status ? appointment.status.toLowerCase() : '';
      if (status === 'scheduled') counts.scheduled++;
      else if (status === 'completed') counts.completed++;
      else if (status === 'cancelled') counts.cancelled++;
      else if (status === 'no-show') counts.noShow++;
    });
    
    return counts;
  }
);
