import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./Slices/Users";
import treatmentsReducer from "./Slices/Treatments";
import diseasesReducer from "./Slices/Diseases";
import diseasesCategoriesReducer from "./Slices/DiseasesCategories";
import appointmentsReducer from "./Slices/Appointments";
import advicesReducer from "./Slices/Advices";
import patientsReducer from "./Slices/Patients";
import doctorsReducer from "./Slices/Doctors";
import nursesReducer from "./Slices/Nurses";
import adminsReducer from "./Slices/Admins";

export const store = configureStore({
  reducer: {
    //* system users
    users: usersReducer,
    patients: patientsReducer,
    doctors: doctorsReducer,
    nurses: nursesReducer,
    admins: adminsReducer,
    // --------------------------------
    diseases: diseasesReducer,
    diseasesCategories: diseasesCategoriesReducer,
    advices: advicesReducer,
    treatments: treatmentsReducer,
    appointments: appointmentsReducer,
  },
});
