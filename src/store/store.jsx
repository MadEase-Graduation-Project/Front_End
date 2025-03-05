import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./Slices/Users";
import treatmentsReducer from "./Slices/Treatments";
import diseasesReducer from "./Slices/Diseases";
import diseasesCategoriesReducer from "./Slices/DiseasesCategories";
import appointmentsReducer from "./Slices/Appointments";
import advicesReducer from "./Slices/Advices";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    treatments: treatmentsReducer,
    diseases: diseasesReducer,
    diseasesCategories: diseasesCategoriesReducer,
    appointments: appointmentsReducer,
    advices: advicesReducer,
  },
});
