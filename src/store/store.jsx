import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/store/slices/userSlice";
import treatmentReducer from "./slices/treatmentSlice";
import diseaseReducer from "./slices/diseaseSlice";
import diseaseCategoryReducer from "./slices/diseasesCategorySlice";
import appointmentReducer from "./slices/appointmentSlice";
import adviceReducer from "./slices/adviceSlice";
import patientReducer from "./slices/patientSlice";
import doctorReducer from "./slices/doctorSlice";
import nurseReducer from "./slices/nurseSlice";
import adminReducer from "./slices/adminSlice";

export const store = configureStore({
  reducer: {
    //* system users
    users: userReducer,
    patients: patientReducer,
    doctors: doctorReducer,
    nurses: nurseReducer,
    admins: adminReducer,
    // --------------------------------
    diseases: diseaseReducer,
    diseasesCategories: diseaseCategoryReducer,
    advices: adviceReducer,
    treatments: treatmentReducer,
    appointments: appointmentReducer,
  },
});
