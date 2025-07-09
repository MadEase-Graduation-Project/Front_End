import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createDisease } from "@/store/slices/diseaseSlice";
import { selectDiseasesLoading, selectDiseasesError } from "@/store/selectors";
import { useSelector } from "react-redux";

const AddDiseaseForm = () => {
  const dispatch = useDispatch();

  const isSubmitting = useSelector(selectDiseasesLoading);
  const submitError = useSelector(selectDiseasesError);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    rank: "",
    description: "",
  });

  const [errors, setErrors] = useState({});

  const severityOptions = ["critical", "severe", "moderate", "mild"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.rank) newErrors.rank = "Severity is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitSuccess(false);
    if (!validateForm()) return;

    const payload = {
      diseaseData: {
        name: formData.name,
        rank: formData.rank,
        description: formData.description,
        diseasecategoryId: "67649b440f6377e11ffdf909", // example category ID
      },
    };

    try {
      await dispatch(createDisease(payload)).unwrap();
      setSubmitSuccess(true);
      setFormData({ name: "", rank: "", description: "" });
    } catch (err) {
      console.error("Failed to add disease:", err);
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-120px)] flex items-start justify-center p-4 sm:p-6">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-md border border-mebeige p-6">
        <h2 className="text-2xl sm:text-3xl font-semibold text-menavy mb-6">Add Disease</h2>

        {submitError && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
            ❌ Something went wrong. Please try again.
          </div>
        )}

        {submitSuccess && (
          <div className="mb-4 p-4 bg-megreen text-white rounded-md">
            ✅ Disease submitted successfully!
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 text-sm text-gray-800">
          {/* Name */}
          <InputField
            label="Disease Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
          />

          {/* Severity Rank */}
          <div>
            <label htmlFor="rank" className="block font-medium text-menavy mb-1">
              Severity Rank *
            </label>
            <select
              id="rank"
              name="rank"
              value={formData.rank}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.rank ? "border-red-400 focus:ring-red-400" : "border-mebeige focus:ring-mepale"
              }`}
            >
              <option value="">-- Select Severity --</option>
              {severityOptions.map((rank) => (
                <option key={rank} value={rank}>
                  {rank.charAt(0).toUpperCase() + rank.slice(1)}
                </option>
              ))}
            </select>
            {errors.rank && <p className="text-sm text-red-600 mt-1">{errors.rank}</p>}
          </div>

          {/* Description */}
          <TextAreaField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            error={errors.description}
          />

          {/* Actions */}
          <div className="flex flex-col sm:flex-row justify-end items-center sm:space-x-4 pt-6 border-t border-mebeige">
            <button
              type="button"
              onClick={() => {
                setFormData({ name: "", rank: "", description: "" });
                setErrors({});
                setSubmitSuccess(false);
              }}
              className="w-full sm:w-auto mt-4 sm:mt-0 px-4 py-2 rounded-md border border-mebeige text-menavy bg-white hover:bg-gray-50 transition"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`w-full sm:w-auto mt-2 sm:mt-0 px-5 py-2 rounded-md text-white font-semibold ${
                isSubmitting ? "bg-mebeige cursor-not-allowed" : "bg-menavy hover:bg-mepale transition"
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Add Disease"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Reusable Input component
const InputField = ({ label, name, value, onChange, error, type = "text" }) => (
  <div>
    <label htmlFor={name} className="block font-medium text-menavy mb-1">
      {label} {label.includes("(optional)") ? "" : "*"}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={`Enter ${label.toLowerCase()}`}
      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
        error ? "border-red-400 focus:ring-red-400" : "border-mebeige focus:ring-mepale"
      }`}
    />
    {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
  </div>
);

// Reusable TextArea component
const TextAreaField = ({ label, name, value, onChange, error }) => (
  <div>
    <label htmlFor={name} className="block font-medium text-menavy mb-1">
      {label} {label.includes("(optional)") ? "" : "*"}
    </label>
    <textarea
      id={name}
      name={name}
      rows={4}
      value={value}
      onChange={onChange}
      placeholder={`Enter ${label.toLowerCase()}...`}
      className={`w-full px-4 py-2 border rounded-lg resize-none focus:outline-none focus:ring-2 ${
        error ? "border-red-400 focus:ring-red-400" : "border-mebeige focus:ring-mepale"
      }`}
    />
    {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
  </div>
);

export default AddDiseaseForm;
