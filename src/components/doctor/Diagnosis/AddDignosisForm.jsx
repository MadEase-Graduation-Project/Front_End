import React, { useEffect, useState } from "react";
import { addDiagnosis } from "@/services/diagnosisApi";

export const AddDiagnosisForm = ({
  doctorId,
  selectedPatient = {},
  patients = [],
  medicationOptions = [],
}) => {
  const [selectedPatientId, setSelectedPatientId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [symptomInput, setSymptomInput] = useState("");
  const [symptoms, setSymptoms] = useState([]);
  const [medications, setMedications] = useState([]);
  const [recommendations, setRecommendations] = useState("");
  const [followUp, setFollowUp] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (selectedPatient?._id) {
      setSelectedPatientId(selectedPatient._id);
    }
  }, [selectedPatient]);

  const handleAddSymptom = () => {
    if (symptomInput.trim()) {
      setSymptoms([...symptoms, symptomInput.trim()]);
      setSymptomInput("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedPatientId) {
      setMessage("Please select a patient.");
      return;
    }

    setLoading(true);
    setMessage("");

    const payload = {
      patientId: selectedPatientId,
      doctorId,
      title,
      description,
      symptoms,
      medications,
      recommendations,
      followUp,
      notes,
    };

    try {
      const response = await addDiagnosis(payload);

      if (response?.success) {
        setMessage("✅ Diagnosis added successfully.");
        setTitle("");
        setDescription("");
        setSymptoms([]);
        setMedications([]);
        setRecommendations("");
        setFollowUp("");
        setNotes("");
        setSelectedPatientId("");
      } else {
        setMessage("❌ Failed to add diagnosis.");
      }
    } catch (err) {
      setMessage("❌ " + (err?.response?.data?.message || "Something went wrong."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-120px)] flex items-start justify-center p-4 sm:p-6">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-md border border-mebeige p-4 sm:p-6 lg:p-8">
        <h2 className="text-2xl sm:text-3xl font-semibold text-menavy mb-6">
          Add New Diagnosis
        </h2>

        {message && (
          <div className="text-sm mb-4 px-4 py-2 rounded-md bg-meblue2 text-menavy font-medium">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 text-sm text-gray-800">
          {/* Patient */}
          <div>
            <label className="block font-medium mb-1 text-menavy">Select Patient</label>
            <select
              value={selectedPatientId}
              onChange={(e) => setSelectedPatientId(e.target.value)}
              className="w-full px-4 py-2 border border-mebeige rounded-lg focus:outline-none focus:ring-2 focus:ring-mepale"
              required
            >
              <option value="">-- Select Patient --</option>
              {patients.map((patient) => (
                <option key={patient._id} value={patient._id}>
                  {patient.name}
                </option>
              ))}
            </select>
          </div>

          {/* Title */}
          <div>
            <label className="block font-medium mb-1 text-menavy">Diagnosis Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Type 2 Diabetes"
              className="w-full px-4 py-2 border border-mebeige rounded-lg focus:outline-none focus:ring-2 focus:ring-mepale"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block font-medium mb-1 text-menavy">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Briefly describe the diagnosis"
              rows={4}
              className="w-full px-4 py-2 border border-mebeige rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-mepale"
              required
            />
          </div>

          {/* Symptoms */}
          <div>
            <label className="block font-medium mb-1 text-menavy">Symptoms</label>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={symptomInput}
                onChange={(e) => setSymptomInput(e.target.value)}
                placeholder="e.g., Headache"
                className="flex-1 px-4 py-2 border border-mebeige rounded-lg focus:outline-none focus:ring-2 focus:ring-megreen"
              />
              <button
                type="button"
                onClick={handleAddSymptom}
                className="bg-megreen text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition"
              >
                Add
              </button>
            </div>
            {symptoms.length > 0 && (
              <ul className="text-sm mt-2 list-disc pl-6 text-gray-700">
                {symptoms.map((s, idx) => (
                  <li key={idx}>{s}</li>
                ))}
              </ul>
            )}
          </div>

          {/* Medications */}
          <div>
            <label className="block font-medium mb-2 text-menavy">Medications</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              {medicationOptions.map((med) => (
                <label key={med._id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value={med._id}
                    checked={medications.includes(med._id)}
                    onChange={(e) => {
                      const isChecked = e.target.checked;
                      const value = e.target.value;
                      setMedications((prev) =>
                        isChecked ? [...prev, value] : prev.filter((id) => id !== value)
                      );
                    }}
                  />
                  <span>{med.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <div>
            <label className="block font-medium mb-1 text-menavy">Recommendations</label>
            <input
              type="text"
              value={recommendations}
              onChange={(e) => setRecommendations(e.target.value)}
              placeholder="e.g., avoid junk food"
              className="w-full px-4 py-2 border border-mebeige rounded-lg focus:outline-none focus:ring-2 focus:ring-meyellow"
            />
          </div>

          {/* Follow-Up */}
          <div>
            <label className="block font-medium mb-1 text-menavy">Follow-Up</label>
            <input
              type="text"
              value={followUp}
              onChange={(e) => setFollowUp(e.target.value)}
              placeholder="e.g., Next Sunday"
              className="w-full px-4 py-2 border border-mebeige rounded-lg focus:outline-none focus:ring-2 focus:ring-meyellow"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block font-medium mb-1 text-menavy">Notes (Optional)</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Additional notes or observations"
              rows={3}
              className="w-full px-4 py-2 border border-mebeige rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-mepale"
            />
          </div>

          {/* Submit */}
          <div className="flex justify-end">
            <button
              type="submit"
              className={`px-6 py-3 text-white font-semibold rounded-lg transition ${
                loading
                  ? "bg-mebeige cursor-not-allowed"
                  : "bg-menavy hover:bg-mepale"
              }`}
              disabled={loading}
            >
              {loading ? "Submitting..." : "Add Diagnosis"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
