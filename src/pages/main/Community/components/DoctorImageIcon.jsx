// here i will get the open endpoint that return doctor details

import { fetchDoctorDetails } from "@/store/slices/doctorSlice";
import { handelNameRoute } from "@/utils/stringUtils";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function DoctorImageIcon({ name }) {
  const dispatch = useDispatch();
  name = handelNameRoute(name);
  const { doctorDetails, loading, error } = useSelector(
    (state) => state.doctors
  );

  useEffect(() => {
    dispatch(fetchDoctorDetails({ name: name }));
  }, [dispatch]);

  console.log(doctorDetails);
  return (
    <>
      <img
        className="h-10 w-10 rounded-full"
        src={doctorDetails?.ImgUrl || ""}
        alt={name || "Doctor"}
      />
    </>
  );
}
