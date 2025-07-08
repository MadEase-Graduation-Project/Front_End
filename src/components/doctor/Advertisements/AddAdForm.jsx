// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { addAd } from "@/services/adsApi";
// import { fetchMYData } from "@/store/slices/userSlice";
// import { selectMyDetails } from "@/store/selectors";

// const AddAdForm = () => {
//   const dispatch = useDispatch();
//   const user = useSelector(selectMyDetails);
//   const creatorId = user?._id;

//   useEffect(() => {
//     dispatch(fetchMYData());
//   }, [dispatch]);

//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//   });

//   const [image, setImage] = useState(null);
//   const [preview, setPreview] = useState(null);
//   const [errors, setErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitSuccess, setSubmitSuccess] = useState(false);
//   const [submitError, setSubmitError] = useState("");

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (errors[name]) {
//       setErrors((prev) => ({ ...prev, [name]: "" }));
//     }
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImage(file);
//       setPreview(URL.createObjectURL(file));
//       setErrors((prev) => ({ ...prev, image: "" }));
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     if (!formData.title.trim()) newErrors.title = "Title is required";
//     if (!formData.description.trim()) newErrors.description = "Description is required";
//     if (!image) newErrors.image = "Image is required";
//     if (!creatorId) newErrors.creator = "User not recognized";
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSubmitError("");
//     setSubmitSuccess(false);
//     if (!validateForm()) return;

//     setIsSubmitting(true);
//     try {
//       const data = new FormData();
//       data.append("creatorName", user?.name); // ✅ Correct key
//       data.append("title", formData.title);
//       data.append("description", formData.description);
//       data.append("ImgUrl", image); // ✅ corrected field name

//       const result = await addAd(data);
//       if (result.success) {
//         setSubmitSuccess(true);
//         setFormData({ title: "", description: "" });
//         setImage(null);
//         setPreview(null);
//       } else {
//         setSubmitError(result.message || "Failed to add ad.");
//       }
//     } catch (err) {
//       console.error(err);
//       setSubmitError("An unexpected error occurred.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="w-full min-h-[calc(100vh-120px)] flex items-start justify-center p-4 sm:p-6">
//       <div className="w-full max-w-4xl bg-white rounded-2xl shadow-md border border-mebeige p-4 sm:p-6 lg:p-8">
//         <div className="mb-6">
//           <h2 className="text-2xl sm:text-3xl font-semibold text-menavy mb-2">
//             Add Advertisement
//           </h2>
//           <p className="text-gray-700 text-sm sm:text-base">
//             Promote your services by submitting an ad
//           </p>
//         </div>

//         {submitError && (
//           <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">{submitError}</div>
//         )}

//         {submitSuccess && (
//           <div className="mb-4 p-4 bg-megreen text-white rounded-md">
//             ✅ Ad submitted successfully!
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-6 text-sm text-gray-800">
//           {/* Doctor Info */}
//           <div>
//             <label className="block font-medium text-menavy mb-1">Doctor *</label>
//             <input
//               type="text"
//               value={user?.name || "Loading..."}
//               readOnly
//               disabled
//               className="w-full px-4 py-2 border rounded-lg bg-gray-100 text-gray-700 cursor-not-allowed"
//             />
//             {errors.creator && <p className="text-sm text-red-600 mt-1">{errors.creator}</p>}
//           </div>

//           {/* Title */}
//           <div>
//             <label htmlFor="title" className="block font-medium text-menavy mb-1">
//               Title *
//             </label>
//             <input
//               id="title"
//               name="title"
//               value={formData.title}
//               onChange={handleChange}
//               placeholder="Enter ad title"
//               className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
//                 errors.title
//                   ? "border-red-400 focus:ring-red-400"
//                   : "border-mebeige focus:ring-mepale"
//               }`}
//             />
//             {errors.title && <p className="text-sm text-red-600 mt-1">{errors.title}</p>}
//           </div>

//           {/* Description */}
//           <div>
//             <label htmlFor="description" className="block font-medium text-menavy mb-1">
//               Description *
//             </label>
//             <textarea
//               id="description"
//               name="description"
//               rows={6}
//               value={formData.description}
//               onChange={handleChange}
//               placeholder="Describe your service or offer..."
//               className={`w-full px-4 py-2 border rounded-lg resize-none focus:outline-none focus:ring-2 ${
//                 errors.description
//                   ? "border-red-400 focus:ring-red-400"
//                   : "border-mebeige focus:ring-mepale"
//               }`}
//             />
//             {errors.description && (
//               <p className="text-sm text-red-600 mt-1">{errors.description}</p>
//             )}
//           </div>

//           {/* Image Upload */}
//           <div>
//             <label htmlFor="image" className="block font-medium text-menavy mb-1">
//               Upload Image *
//             </label>
//             <input
//               id="image"
//               type="file"
//               accept="image/*"
//               onChange={handleImageChange}
//               className="block"
//             />
//             {errors.image && <p className="text-sm text-red-600 mt-1">{errors.image}</p>}
//             {preview && (
//               <img
//                 src={preview}
//                 alt="Preview"
//                 className="mt-4 max-h-64 w-full object-contain rounded-md border"
//               />
//             )}
//           </div>

//           {/* Actions */}
//           <div className="flex flex-col sm:flex-row justify-end items-center sm:space-x-4 pt-6 border-t border-mebeige">
//             <button
//               type="button"
//               className="w-full sm:w-auto mt-4 sm:mt-0 px-4 py-2 rounded-md border border-mebeige text-menavy bg-white hover:bg-gray-50 transition"
//               onClick={() => {
//                 setFormData({ title: "", description: "" });
//                 setImage(null);
//                 setPreview(null);
//                 setErrors({});
//                 setSubmitError("");
//                 setSubmitSuccess(false);
//               }}
//               disabled={isSubmitting}
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className={`w-full sm:w-auto mt-2 sm:mt-0 px-5 py-2 rounded-md text-white font-semibold ${
//                 isSubmitting
//                   ? "bg-mebeige cursor-not-allowed"
//                   : "bg-menavy hover:bg-mepale transition"
//               }`}
//               disabled={isSubmitting}
//             >
//               {isSubmitting ? "Submitting..." : "Add Ad"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddAdForm;
