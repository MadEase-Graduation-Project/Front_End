import { addAdvice } from "@/services/adviceApi";
import React, { useState } from "react";

const AddBlogPostForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (!formData.category.trim()) newErrors.category = "Category is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    setSubmitSuccess(false);

    if (!validateForm()) return;

    try {
      setIsSubmitting(true);
      const result = await addAdvice(formData);

      if (result.success) {
        setSubmitSuccess(true);
        setFormData({ title: "", description: "", category: "" });
      } else {
        setSubmitError(result.message || "Failed to save blog post");
      }
    } catch (error) {
      console.error("Failed to save blog post:", error);
      setSubmitError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-120px)] flex items-start justify-center p-4 sm:p-6">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-md border border-mebeige p-4 sm:p-6 lg:p-8">
        <div className="mb-6">
          <h2 className="text-2xl sm:text-3xl font-semibold text-menavy mb-2">
            Add Blog Post
          </h2>
          <p className="text-gray-700 text-sm sm:text-base">
            Share a new piece of advice with your readers
          </p>
        </div>

        {submitError && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
            {submitError}
          </div>
        )}

        {submitSuccess && (
          <div className="mb-4 p-4 bg-megreen text-white rounded-md">
            ✅ Blog post saved successfully!
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 text-sm text-gray-800">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block font-medium text-menavy mb-1">
              Title *
            </label>
            <input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter blog post title"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.title
                  ? "border-red-400 focus:ring-red-400"
                  : "border-mebeige focus:ring-mepale"
              }`}
            />
            {errors.title && (
              <p className="text-sm text-red-600 mt-1">{errors.title}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block font-medium text-menavy mb-1">
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={10}
              placeholder="Write the content of your post..."
              className={`w-full px-4 py-2 border rounded-lg resize-none focus:outline-none focus:ring-2 ${
                errors.description
                  ? "border-red-400 focus:ring-red-400"
                  : "border-mebeige focus:ring-mepale"
              }`}
            />
            {errors.description && (
              <p className="text-sm text-red-600 mt-1">{errors.description}</p>
            )}
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block font-medium text-menavy mb-1">
              Category *
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.category
                  ? "border-red-400 focus:ring-red-400"
                  : "border-mebeige focus:ring-megreen"
              }`}
            >
              <option value="">Select a category</option>
              <option value="general-health">General Health</option>
              <option value="nutrition">Nutrition</option>
              <option value="mental-health">Mental Health</option>
              <option value="fitness">Fitness & Exercise</option>
              <option value="preventive-care">Preventive Care</option>
              <option value="chronic-conditions">Chronic Conditions</option>
              <option value="medication">Medication</option>
              <option value="lifestyle">Lifestyle</option>
            </select>
            {errors.category && (
              <p className="text-sm text-red-600 mt-1">{errors.category}</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row justify-end items-center sm:space-x-4 pt-6 border-t border-mebeige">
            <button
              type="button"
              className="w-full sm:w-auto mt-4 sm:mt-0 px-4 py-2 rounded-md border border-mebeige text-menavy bg-white hover:bg-gray-50 transition"
              onClick={() => {
                setFormData({ title: "", description: "", category: "" });
                setErrors({});
                setSubmitError("");
                setSubmitSuccess(false);
              }}
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
              {isSubmitting ? "Saving..." : "Save Blog Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBlogPostForm;
