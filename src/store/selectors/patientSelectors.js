import { createSelector } from '@reduxjs/toolkit';

// Basic selectors
const selectPatientsState = state => state.patients;
export const selectAllPatients = state => selectPatientsState(state).items;
export const selectPatientsLoading = state => selectPatientsState(state).loading;
export const selectPatientsError = state => selectPatientsState(state).error;
export const selectSelectedPatient = state => selectPatientsState(state).selectedPatient;

// Memoized selectors
export const selectFilteredPatients = createSelector(
  [selectAllPatients, (state, searchQuery) => searchQuery],
  (patients, searchQuery) => {
    if (!patients || patients.length === 0) return [];

    if (!searchQuery || searchQuery.trim() === "") {
      return patients;
    }

    const query = searchQuery.toLowerCase();
    return patients.filter(
      (patient) =>
        (patient.name && patient.name.toLowerCase().includes(query)) ||
        (patient.email && patient.email.toLowerCase().includes(query)) ||
        (patient.phone && patient.phone.includes(query)) ||
        (patient.city && patient.city.toLowerCase().includes(query))
    );
  }
);

// Get patient by ID
export const makeSelectPatientById = () => 
  createSelector(
    [selectAllPatients, (_, patientId) => patientId],
    (patients, patientId) => patients.find(patient => patient._id === patientId)
  );

// Get patients by city
export const selectPatientsByCity = createSelector(
  [selectAllPatients, (_, city) => city],
  (patients, city) => {
    if (!city) return patients;
    return patients.filter(patient => 
      patient.city && patient.city.toLowerCase() === city.toLowerCase()
    );
  }
);

// Get patients with appointments
export const selectPatientsWithAppointments = createSelector(
  [selectAllPatients, (_, appointments) => appointments],
  (patients, appointments) => {
    if (!appointments || appointments.length === 0) return [];
    
    const patientIdsWithAppointments = new Set(
      appointments.map(appointment => appointment.patientId)
    );
    
    return patients.filter(patient => 
      patientIdsWithAppointments.has(patient._id)
    );
  }
);

// Get patients count by gender
export const selectPatientCountsByGender = createSelector(
  [selectAllPatients],
  (patients) => {
    const counts = {
      male: 0,
      female: 0,
      other: 0
    };
    
    patients.forEach(patient => {
      const gender = patient.gender ? patient.gender.toLowerCase() : 'other';
      if (gender === 'male') counts.male++;
      else if (gender === 'female') counts.female++;
      else counts.other++;
    });
    
    return counts;
  }
);

// Get patients by age range
export const selectPatientsByAgeRange = createSelector(
  [selectAllPatients, (_, minAge) => minAge, (_, __, maxAge) => maxAge],
  (patients, minAge, maxAge) => {
    if (!patients || patients.length === 0) return [];
    if (minAge === undefined && maxAge === undefined) return patients;
    
    const currentYear = new Date().getFullYear();
    
    return patients.filter(patient => {
      if (!patient.birthDate) return false;
      
      const birthYear = new Date(patient.birthDate).getFullYear();
      const age = currentYear - birthYear;
      
      if (minAge !== undefined && maxAge !== undefined) {
        return age >= minAge && age <= maxAge;
      } else if (minAge !== undefined) {
        return age >= minAge;
      } else if (maxAge !== undefined) {
        return age <= maxAge;
      }
      
      return true;
    });
  }
);
