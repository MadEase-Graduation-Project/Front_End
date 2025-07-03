import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchAllTreatments } from "@/store/slices/treatmentSlice"
import { AddDiagnosisForm } from "@/components/doctor/Diagnosis/AddDignosisForm"

const Diagnosis_doctor = ({ patientId, doctorId }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAllTreatments())
  }, [dispatch])

  const medications = useSelector((state) => state.treatments.treatments)

  return (
    <div className='px-4 grid gap-3 grid-cols-12'>
      <AddDiagnosisForm
        patientId={patientId}
        doctorId={doctorId}
        medicationOptions={medications}
      />
    </div>
  )
}

export default Diagnosis_doctor
