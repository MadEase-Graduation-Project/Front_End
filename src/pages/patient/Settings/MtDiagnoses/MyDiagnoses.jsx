import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAllDiagnosis,
  selectDiagnosisLoading,
  selectTotalDiagnosis,
} from "@/store/selectors";
import { fetchAllDiagnosis } from "@/store/slices/diagnosisSlice";
import { selectMyDetails } from "@/store/selectors";
import DiagnosisCard from "./components/DiagnosisCard";

export default function MyDiagnoses() {
  const dispatch = useDispatch();
  const Diagnosis = useSelector(selectAllDiagnosis); ////////////
  const diagnosisList = Array.isArray(Diagnosis) ? Diagnosis : []; ////
  const totalDiagnosis = useSelector(selectTotalDiagnosis);
  const loading = useSelector(selectDiagnosisLoading);
  const user = useSelector(selectMyDetails);

  useEffect(() => {
    if (user?._id) {
      console.log("Fetching diagnosis for patient:", user._id);
      dispatch(fetchAllDiagnosis(user._id));
    }
  }, [dispatch, user?._id]);

  return (
    <div className="flex flex-col w-full max-w-4xl px-4 py-8 mx-auto h-full gap-6">
      {loading ? (
        <p className="text-center text-gray-500">Loading diagnoses...</p>
      ) : totalDiagnosis === 0 ? (
        <p className="text-center text-gray-500">No diagnoses found.</p>
      ) : (
        diagnosisList.map((diag) =>
          diag ? <DiagnosisCard key={diag._id} diagnosis={diag} /> : null
        )
      )}
    </div>
  );
}
