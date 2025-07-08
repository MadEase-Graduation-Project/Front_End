import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/store/slices/userSlice";
import treatmentReducer from "@/store/slices/treatmentSlice";
import diseaseReducer from "@/store/slices/diseaseSlice";
import diseaseCategoryReducer from "@/store/slices/diseasesCategorySlice";
import appointmentReducer from "@/store/slices/appointmentSlice";
import adviceReducer from "@/store/slices/adviceSlice";
import patientReducer from "@/store/slices/patientSlice";
import doctorReducer from "@/store/slices/doctorSlice";
import nurseReducer from "@/store/slices/nurseSlice";
import adminReducer from "@/store/slices/adminSlice";
import hospitalReducer from "@/store/slices/hospitalSlice";
import signReducer from "@/store/slices/signSlice";
import otpReducer from "@/store/slices/otpSlice";
import chatBotReducer from "@/store/slices/chatbotSlice";
import adsReducer from "@/store/slices/adsSlice";
import diagnosisReducer from "@/store/slices/diagnosisSlice";

export const store = configureStore({
  reducer: {
    //* system users
    users: userReducer,
    patients: patientReducer,
    doctors: doctorReducer,
    nurses: nurseReducer,
    admins: adminReducer,
    hospital: hospitalReducer,
    sign: signReducer,
    otp: otpReducer,
    // --------------------------------
    diseases: diseaseReducer,
    diseasesCategories: diseaseCategoryReducer,
    advices: adviceReducer,
    treatments: treatmentReducer,
    appointments: appointmentReducer,
    chatbot: chatBotReducer,
    ads: adsReducer,
    diagnosis: diagnosisReducer,
  },
});
