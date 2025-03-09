import React, { useState } from "react";
import { addDisease } from "../../../services/DiseasesApi";

const ranks = ["critical", "severe", "moderate", "mild"];

export const AddDiseaseForm = ({ token }) => {
  const [diseaseName, setDiseaseName] = useState("");
  const [rank, setRank] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
  
    try {
      const response = await addDisease(
        { name: diseaseName, rank: rank, description: description, diseasecategoryId: "67649b440f6377e11ffdf909" },
        token
      );
  
      console.log("API Response:", response);
  
      if (response) {
        setMessage("Disease added successfully!");
        setDiseaseName("");
        setRank("");
        setDescription("");
      } else {
        setMessage("Failed to add disease.");
      }
    } catch (error) {
      console.error("API Error:", error);
      setMessage("Error: " + (error.response?.data?.message || "Something went wrong"));
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="w-full mx-auto p-6 bg-white shadow-lg rounded-lg col-span-12">
      <h2 className="text-2xl font-semibold mb-4">Add a New Disease</h2>
      {message && <p className="text-center text-sm mb-2 text-gray-700">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium text-gray-700">Disease Name</label>
          <input
            type="text"
            value={diseaseName}
            onChange={(e) => setDiseaseName(e.target.value)}
            placeholder="Enter disease name"
            className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-200"
            required
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">Category</label>
          <select
            value={rank}
            onChange={(e) => setRank(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-200"
            required
          >
            <option value="">Select a rank</option>
            {ranks.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the disease"
            className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-200 h-[165px]"
            required
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
            {loading ? "Submitting..." : "Add Disease"}
          </button>
        </div>
      </form>
    </div>
  );
};
