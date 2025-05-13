import { createSelector } from '@reduxjs/toolkit';

// Basic selectors
const selectDoctorsState = state => state.doctors;
export const selectAllDoctors = state => selectDoctorsState(state).items;
export const selectDoctorsLoading = state => selectDoctorsState(state).loading;
export const selectDoctorsError = state => selectDoctorsState(state).error;
export const selectSelectedDoctor = state => selectDoctorsState(state).selectedDoctor;

// Memoized selectors
export const selectDoctorSpecialties = createSelector(
  [selectAllDoctors],
  (doctors) => {
    if (!doctors || doctors.length === 0) return ["All Specialties"];
    
    return [
      "All Specialties",
      ...Array.from(
        new Set(doctors.map((doctor) => doctor.specialty))
      ).filter(Boolean)
    ];
  }
);

export const selectFilteredDoctors = createSelector(
  [selectAllDoctors, (state, searchQuery) => searchQuery, (state, _, selectedSpecialty) => selectedSpecialty],
  (doctors, searchQuery, selectedSpecialty) => {
    if (!doctors || doctors.length === 0) return [];

    let filtered = [...doctors];

    // Filter by search query
    if (searchQuery && searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (doctor) =>
          (doctor.name && doctor.name.toLowerCase().includes(query)) ||
          (doctor.email && doctor.email.toLowerCase().includes(query)) ||
          (doctor.phone && doctor.phone.includes(query)) ||
          (doctor.specialty && doctor.specialty.toLowerCase().includes(query))
      );
    }

    // Filter by specialty
    if (selectedSpecialty && selectedSpecialty !== "All Specialties") {
      filtered = filtered.filter(
        (doctor) => doctor.specialty === selectedSpecialty
      );
    }

    return filtered;
  }
);

// Get doctor by ID
export const makeSelectDoctorById = () => 
  createSelector(
    [selectAllDoctors, (_, doctorId) => doctorId],
    (doctors, doctorId) => doctors.find(doctor => doctor._id === doctorId)
  );

// Get doctors by specialty
export const selectDoctorsBySpecialty = createSelector(
  [selectAllDoctors, (_, specialty) => specialty],
  (doctors, specialty) => {
    if (specialty === "All Specialties" || !specialty) return doctors;
    return doctors.filter(doctor => doctor.specialty === specialty);
  }
);

// Get doctors with appointments
export const selectDoctorsWithAppointments = createSelector(
  [selectAllDoctors, (_, appointments) => appointments],
  (doctors, appointments) => {
    if (!appointments || appointments.length === 0) return [];
    
    const doctorIdsWithAppointments = new Set(
      appointments.map(appointment => appointment.doctorId)
    );
    
    return doctors.filter(doctor => 
      doctorIdsWithAppointments.has(doctor._id)
    );
  }
);

// Get doctors with advices
export const selectDoctorsWithAdvices = createSelector(
  [selectAllDoctors, (_, advices) => advices],
  (doctors, advices) => {
    if (!advices || advices.length === 0) return [];
    
    const doctorIdsWithAdvices = new Set(
      advices.map(advice => advice.doctorId)
    );
    
    return doctors.filter(doctor => 
      doctorIdsWithAdvices.has(doctor._id)
    );
  }
);

// Get top doctors (by appointment count)
export const selectTopDoctors = createSelector(
  [selectAllDoctors, (_, appointments) => appointments],
  (doctors, appointments) => {
    if (!doctors || doctors.length === 0 || !appointments || appointments.length === 0) {
      return [];
    }
    
    // Count appointments per doctor
    const appointmentCounts = {};
    appointments.forEach(appointment => {
      const doctorId = appointment.doctorId;
      appointmentCounts[doctorId] = (appointmentCounts[doctorId] || 0) + 1;
    });
    
    // Sort doctors by appointment count
    return [...doctors]
      .map(doctor => ({
        ...doctor,
        appointmentCount: appointmentCounts[doctor._id] || 0
      }))
      .sort((a, b) => b.appointmentCount - a.appointmentCount)
      .slice(0, 5); // Get top 5
  }
);
