import React from "react";

const HospitalProfile = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
        <div className="w-full md:w-1/3 h-64 bg-gray-300 flex items-center justify-center">
          <span className="text-gray-500">Hospital Image</span>
        </div>

        <div className="p-6 md:w-2/3">
        
          <h2 className="text-3xl font-bold text-blue-700 mb-4">
            Hospital Name
          </h2>

          <div className="space-y-3 text-gray-700 text-lg">
            
            <p>
              <span className="font-semibold">📍 Location:</span>{" "}
              <span className="text-gray-400">City, Country</span>
            </p>
            <p>
              <span className="font-semibold">📞 Phone:</span>{" "}
              <span className="text-gray-400">Phone Number</span>
            </p>
            <p>
              <span className="font-semibold">🏗️ Established:</span>{" "}
              <span className="text-gray-400">Year</span>
            </p>
            <p>
              <span className="font-semibold">⭐ Rating:</span>{" "}
              <span className="text-gray-400">X/5</span>
            </p>
            <p>
              <span className="font-semibold">🌐 Profile:</span>{" "}
              <span className="text-blue-400 underline">Website Link</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalProfile;
