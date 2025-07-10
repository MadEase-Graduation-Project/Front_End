import { useState } from "react";

const labResultsData = [
  {
    id: "lab001",
    patientName: "Ahmed Mohamed",
    patientId: "p001",
    testName: "Complete Blood Count (CBC)",
    date: "2025-07-02",
    resultsSummary: "Hemoglobin: 14.2 g/dL, WBC: 6,000 /µL, Platelets: 250,000 /µL",
    details:
      `Hemoglobin: 14.2 g/dL (Normal)\nWhite Blood Cells (WBC): 6,000 /µL (Normal)\nPlatelets: 250,000 /µL (Normal)\nNo abnormalities detected in red blood cell morphology.`,
  },
  {
    id: "lab002",
    patientName: "Mona Ali",
    patientId: "p002",
    testName: "Liver Function Test (LFT)",
    date: "2025-06-15",
    resultsSummary: "ALT: 35 U/L, AST: 30 U/L, Bilirubin: 0.8 mg/dL",
    details:
      `Alanine transaminase (ALT): 35 U/L (Normal)\nAspartate transaminase (AST): 30 U/L (Normal)\nTotal Bilirubin: 0.8 mg/dL (Normal)\nNo signs of liver dysfunction.`,
  },
  {
    id: "lab003",
    patientName: "Youssef Nabil",
    patientId: "p003",
    testName: "Blood Glucose",
    date: "2025-05-20",
    resultsSummary: "Fasting Glucose: 110 mg/dL (Pre-diabetic range)",
    details:
      `Fasting Blood Glucose: 110 mg/dL (Slightly elevated, indicating pre-diabetes)\nRecommend lifestyle modification and follow-up testing.`,
  },
  {
    id: "lab004",
    patientName: "Fatma Hassan",
    patientId: "p004",
    testName: "Urinalysis",
    date: "2025-06-15",
    resultsSummary: "pH: 6.0, Protein: Negative, Glucose: Negative",
    details:
      `Urine pH: 6.0 (Normal)\nProtein: Negative\nGlucose: Negative\nNo evidence of urinary tract infection or renal pathology.`,
  },
  {
    id: "lab005",
    patientName: "Mohamed Said",
    patientId: "p005",
    testName: "Thyroid Panel",
    date: "2025-05-25",
    resultsSummary: "TSH: 2.5 µIU/mL, Free T4: 1.2 ng/dL",
    details:
      `Thyroid Stimulating Hormone (TSH): 2.5 µIU/mL (Normal)\nFree Thyroxine (T4): 1.2 ng/dL (Normal)\nNo signs of hypothyroidism or hyperthyroidism.`,
  },
];

export default function NurseLabResults() {
  const [selectedResult, setSelectedResult] = useState(null);

  return (
    <section className="p-6 max-w-7xl mx-auto">
      <h1 className="text-4xl font-extrabold mb-6 text-[#142139]">Lab Results</h1>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {labResultsData.map((result) => (
          <div
            key={result.id}
            onClick={() => setSelectedResult(result)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") setSelectedResult(result);
            }}
            className="cursor-pointer rounded-lg bg-white shadow-lg p-5 hover:shadow-xl transition-shadow"
            aria-label={`View full lab result of ${result.testName} for ${result.patientName}`}
          >
            <h2 className="text-xl font-semibold text-[#007eb1] mb-2">{result.testName}</h2>
            <p className="text-gray-700 font-medium">{result.patientName}</p>
            <p className="text-gray-500 text-sm mb-4">{result.date}</p>
            <p className="text-gray-600 italic line-clamp-3">{result.resultsSummary}</p>
          </div>
        ))}
      </div>

      {/* نافذة تفاصيل التحليل */}
      {selectedResult && (
        <LabResultDetailsModal result={selectedResult} onClose={() => setSelectedResult(null)} />
      )}
    </section>
  );
}

function LabResultDetailsModal({ result, onClose }) {
  if (!result) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div
        className="bg-white rounded-lg shadow-xl max-w-3xl w-full p-6 overflow-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-2xl font-bold"
          aria-label="Close lab result details"
        >
          ×
        </button>

        <h2 id="modal-title" className="text-3xl font-bold text-[#142139] mb-4">
          {result.testName}
        </h2>
        <p className="text-gray-700 font-semibold mb-2">
          Patient: {result.patientName} (ID: {result.patientId})
        </p>
        <p className="text-gray-500 mb-6">{result.date}</p>

        <div id="modal-description" className="text-gray-800 whitespace-pre-line">
          {result.details}
        </div>
      </div>
    </div>
  );
}
