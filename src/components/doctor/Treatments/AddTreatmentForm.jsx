import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTreatment } from "@/store/slices/treatmentSlice";
import {
  selectTreatmentsLoading,
  selectTreatmentsError,
} from "@/store/selectors/treatmentSelectors";
import { selectAllDiseases, selectDiseasesLoading } from "@/store/selectors";
import { fetchAllDiseases } from "@/store/slices/diseaseSlice";

const AddTreatmentForm = () => {
  const dispatch = useDispatch();

  // Treatments state
  const isSubmitting = useSelector(selectTreatmentsLoading);
  const submitError = useSelector(selectTreatmentsError);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Diseases state
  const diseases = useSelector(selectAllDiseases);
  const diseasesLoading = useSelector(selectDiseasesLoading);

  useEffect(() => {
    dispatch(fetchAllDiseases({ page: 1 }));
  }, [dispatch]);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    diseaseID: "",
    dosage: "",
    instructions: "",
    quantity: "",
    refills: "",
    notes: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (!formData.diseaseID) newErrors.diseaseID = "Disease is required";
    if (!formData.dosage.trim()) newErrors.dosage = "Dosage is required";
    if (!formData.instructions.trim()) newErrors.instructions = "Instructions are required";
    if (!formData.quantity.trim()) newErrors.quantity = "Quantity is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitSuccess(false);
    if (!validateForm()) return;

    const payload = {
      ...formData,
      refills: formData.refills ? parseInt(formData.refills, 10) : 0,
    };

    try {
      await dispatch(createTreatment(payload)).unwrap();
      setSubmitSuccess(true);
      setFormData({
        name: "",
        description: "",
        diseaseID: "",
        dosage: "",
        instructions: "",
        quantity: "",
        refills: "",
        notes: "",
      });
    } catch (err) {
      console.error("Failed to create treatment:", err);
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-120px)] flex items-start justify-center p-4 sm:p-6">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-md border border-mebeige p-6">
        <h2 className="text-2xl sm:text-3xl font-semibold text-menavy mb-6">
          Add Treatment
        </h2>

        {submitError && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
            ❌ Something went wrong. Please try again.
          </div>
        )}

        {submitSuccess && (
          <div className="mb-4 p-4 bg-megreen text-white rounded-md">
            ✅ Treatment submitted successfully!
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 text-sm text-gray-800">
          {/* Name */}
          <InputField
            label="Treatment Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
          />

          {/* Description */}
          <TextAreaField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            error={errors.description}
          />

          {/* Disease Dropdown */}
          <div>
            <label htmlFor="diseaseID" className="block font-medium text-menavy mb-1">
              Related Disease *
            </label>
            <select
              id="diseaseID"
              name="diseaseID"
              value={formData.diseaseID}
              onChange={handleChange}
              disabled={diseasesLoading}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.diseaseID
                  ? "border-red-400 focus:ring-red-400"
                  : "border-mebeige focus:ring-mepale"
              }`}
            >
              <option value="">-- Select Disease --</option>
              {diseases.map((disease) => (
                <option key={disease._id} value={disease._id}>
                  {disease.name}
                </option>
              ))}
            </select>
            {errors.diseaseID && (
              <p className="text-sm text-red-600 mt-1">{errors.diseaseID}</p>
            )}
          </div>

          {/* Dosage */}
          <InputField
            label="Dosage"
            name="dosage"
            value={formData.dosage}
            onChange={handleChange}
            error={errors.dosage}
          />

          {/* Instructions */}
          <TextAreaField
            label="Instructions"
            name="instructions"
            value={formData.instructions}
            onChange={handleChange}
            error={errors.instructions}
          />

          {/* Quantity */}
          <InputField
            label="Quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            error={errors.quantity}
          />

          {/* Refills (optional) */}
          <InputField
            label="Refills (optional)"
            name="refills"
            type="number"
            value={formData.refills}
            onChange={handleChange}
          />

          {/* Notes (optional) */}
          <TextAreaField
            label="Notes (optional)"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
          />

          {/* Actions */}
          <div className="flex flex-col sm:flex-row justify-end items-center sm:space-x-4 pt-6 border-t border-mebeige">
            <button
              type="button"
              onClick={() => {
                setFormData({
                  name: "",
                  description: "",
                  diseaseID: "",
                  dosage: "",
                  instructions: "",
                  quantity: "",
                  refills: "",
                  notes: "",
                });
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
                isSubmitting
                  ? "bg-mebeige cursor-not-allowed"
                  : "bg-menavy hover:bg-mepale transition"
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Add Treatment"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

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

export default AddTreatmentForm;
