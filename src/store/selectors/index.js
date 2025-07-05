// Export all selectors from individual files
export * from "./adviceSelectors";
export * from "./diseaseSelectors";
export * from "./patientSelectors";
export * from "./doctorSelectors";
export * from "./appointmentSelectors";
export * from "./adsSelectors";
export * from "./adminSelectors";
export * from "./diagnosisSelectors";
export * from "./diseasesCategorySelectors";
export * from "./hospitalSelectors";
export * from "./nurseSelectors";
export * from "./otpSelectors";
export * from "./signSelectors";
export * from "./treatmentSelectors";
export * from "./userSelectors";

// Add any combined selectors here
import { createSelector } from "@reduxjs/toolkit";
import { selectAllDoctors } from "./doctorSelectors";
import { selectAllPatients } from "./patientSelectors";
import { selectAllAppointments } from "./appointmentSelectors";
import { selectAllAdvices } from "./adviceSelectors";
import { selectAllDiseases } from "./diseaseSelectors";

// Combined search selector for global search
export const selectGlobalSearchResults = createSelector(
  [
    selectAllDoctors,
    selectAllPatients,
    selectAllAppointments,
    selectAllAdvices,
    selectAllDiseases,
    (_, searchQuery) => searchQuery,
  ],
  (doctors, patients, appointments, advices, diseases, searchQuery) => {
    if (!searchQuery || searchQuery.trim() === "") {
      return [];
    }

    const query = searchQuery.toLowerCase();
    const results = [];

    // Search in doctors
    doctors.forEach((doctor) => {
      if (
        (doctor.name && doctor.name.toLowerCase().includes(query)) ||
        (doctor.email && doctor.email.toLowerCase().includes(query)) ||
        (doctor.specialty && doctor.specialty.toLowerCase().includes(query))
      ) {
        results.push({
          ...doctor,
          type: "doctor",
          path: `/improved-admin/doctors/${doctor._id}`,
        });
      }
    });

    // Search in patients
    patients.forEach((patient) => {
      if (
        (patient.name && patient.name.toLowerCase().includes(query)) ||
        (patient.email && patient.email.toLowerCase().includes(query)) ||
        (patient.phone && patient.phone.includes(query))
      ) {
        results.push({
          ...patient,
          type: "patient",
          path: `/improved-admin/patients/${patient._id}`,
        });
      }
    });

    // Search in appointments
    appointments.forEach((appointment) => {
      if (
        (appointment.patientName &&
          appointment.patientName.toLowerCase().includes(query)) ||
        (appointment.doctorName &&
          appointment.doctorName.toLowerCase().includes(query)) ||
        (appointment.reason && appointment.reason.toLowerCase().includes(query))
      ) {
        results.push({
          ...appointment,
          type: "appointment",
          path: `/improved-admin/appointments/${appointment._id}`,
        });
      }
    });

    // Search in advices
    advices.forEach((advice) => {
      if (
        (advice.title && advice.title.toLowerCase().includes(query)) ||
        (advice.description &&
          advice.description.toLowerCase().includes(query)) ||
        (advice.doctorName && advice.doctorName.toLowerCase().includes(query))
      ) {
        results.push({
          ...advice,
          type: "advice",
          path: `/improved-admin/advices/${advice._id}`,
        });
      }
    });

    // Search in diseases
    diseases.forEach((disease) => {
      if (
        (disease.name && disease.name.toLowerCase().includes(query)) ||
        (disease.description &&
          disease.description.toLowerCase().includes(query)) ||
        (disease.symptoms && disease.symptoms.toLowerCase().includes(query))
      ) {
        results.push({
          ...disease,
          type: "disease",
          path: `/improved-admin/diseases/${disease._id}`,
        });
      }
    });

    return results.slice(0, 10); // Limit to 10 results
  }
);

// Dashboard statistics selector
export const selectDashboardStats = createSelector(
  [selectAllDoctors, selectAllPatients, selectAllAppointments],
  (doctors, patients, appointments) => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    // Count appointments by status
    const appointmentCounts = {
      total: appointments.length,
      scheduled: 0,
      completed: 0,
      cancelled: 0,
      noShow: 0,
      thisMonth: 0,
    };

    appointments.forEach((appointment) => {
      const status = appointment.status ? appointment.status.toLowerCase() : "";
      if (status === "scheduled") appointmentCounts.scheduled++;
      else if (status === "completed") appointmentCounts.completed++;
      else if (status === "cancelled") appointmentCounts.cancelled++;
      else if (status === "no-show") appointmentCounts.noShow++;

      // Count appointments for current month
      const appointmentDate = new Date(appointment.date);
      if (
        appointmentDate.getMonth() === currentMonth &&
        appointmentDate.getFullYear() === currentYear
      ) {
        appointmentCounts.thisMonth++;
      }
    });

    return {
      totalDoctors: doctors.length,
      totalPatients: patients.length,
      appointments: appointmentCounts,
    };
  }
);
