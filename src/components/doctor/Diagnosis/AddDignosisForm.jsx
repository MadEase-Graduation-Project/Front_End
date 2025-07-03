import React, { useState } from "react"
import { addDiagnosis } from "@/services/diagnosisApi"

export const AddDiagnosisForm = ({ patientId, doctorId, medicationOptions = [] }) => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [symptomInput, setSymptomInput] = useState("")
  const [symptoms, setSymptoms] = useState([])
  const [medications, setMedications] = useState([])
  const [recommendations, setRecommendations] = useState("")
  const [followUp, setFollowUp] = useState("")
  const [notes, setNotes] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const handleAddSymptom = () => {
    if (symptomInput.trim()) {
      setSymptoms([...symptoms, symptomInput.trim()])
      setSymptomInput("")
    }
  }

  const handleMedicationChange = (e) => {
    const selected = Array.from(e.target.selectedOptions, (option) => option.value)
    setMedications(selected)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    const payload = {
      patientId,
      doctorId,
      title,
      description,
      symptoms,
      medications,
      recommendations,
      followUp,
      notes,
    }

    try {
      const response = await addDiagnosis(payload)

      if (response?.success) {
        setMessage("Diagnosis added successfully.")
        setTitle("")
        setDescription("")
        setSymptoms([])
        setMedications([])
        setRecommendations("")
        setFollowUp("")
        setNotes("")
      } else {
        setMessage("Failed to add diagnosis.")
      }
    } catch (err) {
      setMessage("Error: " + (err?.response?.data?.message || "Something went wrong."))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full p-6 bg-white shadow-lg rounded-lg col-span-12">
      <h2 className="text-2xl font-semibold mb-4">Add Diagnosis</h2>
      {message && <p className="text-sm text-gray-700 mb-3">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="font-medium">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Diagnosis title"
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>

        <div>
          <label className="font-medium">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Diagnosis description"
            className="w-full px-3 py-2 border rounded-lg h-24"
            required
          />
        </div>

        <div>
          <label className="font-medium">Symptoms</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={symptomInput}
              onChange={(e) => setSymptomInput(e.target.value)}
              placeholder="e.g. headache"
              className="flex-1 px-3 py-2 border rounded-lg"
            />
            <button
              type="button"
              onClick={handleAddSymptom}
              className="px-4 py-2 bg-[#37568d] text-white rounded-lg hover:bg-[#1e3356]"
            >
              Add
            </button>
          </div>
          {symptoms.length > 0 && (
            <ul className="text-sm mt-2 list-disc pl-5 text-gray-600">
              {symptoms.map((s, idx) => (
                <li key={idx}>{s}</li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <label className="font-medium">Medications</label>
          <select
            multiple
            value={medications}
            onChange={handleMedicationChange}
            className="w-full px-3 py-2 border rounded-lg"
          >
            {medicationOptions.map((med) => (
              <option key={med._id} value={med._id}>
                {med.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="font-medium">Recommendations</label>
          <input
            type="text"
            value={recommendations}
            onChange={(e) => setRecommendations(e.target.value)}
            placeholder="e.g. avoid junk food"
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>

        <div>
          <label className="font-medium">Follow-Up</label>
          <input
            type="text"
            value={followUp}
            onChange={(e) => setFollowUp(e.target.value)}
            placeholder="e.g. next Sunday"
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>

        <div>
          <label className="font-medium">Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Optional notes"
            className="w-full px-3 py-2 border rounded-lg h-20"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className={`px-4 py-2 text-white font-semibold rounded-lg ${
              loading ? "bg-gray-400" : "bg-[#37568d] hover:bg-[#1e3356]"
            }`}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Add Diagnosis"}
          </button>
        </div>
      </form>
    </div>
  )
}
