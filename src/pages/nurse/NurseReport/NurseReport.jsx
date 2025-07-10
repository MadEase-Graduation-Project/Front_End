import { useState } from "react";

const reportsData = [
  {
    id: "r001",
    patientName: "Ahmed Mohamed",
    patientId: "p001",
    date: "2025-07-02",
    reportType: "Blood Test",
    summary: "Normal hemoglobin and white blood cell counts.",
    details:
      "Complete blood count (CBC) performed. Hemoglobin: 14.2 g/dL, WBC: 6,000 /µL, Platelets: 250,000 /µL. No abnormalities detected.",
  },
  {
    id: "r002",
    patientName: "Mona Ali",
    patientId: "p002",
    date: "2025-06-15",
    reportType: "MRI Brain",
    summary: "No signs of stroke or tumor.",
    details:
      "MRI scan showed normal brain structure with no ischemic or hemorrhagic areas. Ventricles and sulci within normal limits.",
  },
  {
    id: "r003",
    patientName: "Youssef Nabil",
    patientId: "p003",
    date: "2025-05-20",
    reportType: "ECG",
    summary: "Mild arrhythmia detected.",
    details:
      "ECG shows occasional premature ventricular contractions. Patient advised for further cardiology follow-up.",
  },
  {
    id: "r004",
    patientName: "Fatma Hassan",
    patientId: "p004",
    date: "2025-06-15",
    reportType: "Kidney Function Test",
    summary: "Elevated creatinine and urea levels.",
    details:
      "Serum creatinine: 2.1 mg/dL (high), Blood urea nitrogen (BUN): 40 mg/dL (high). Indicates impaired kidney function.",
  },
  {
    id: "r005",
    patientName: "Mohamed Said",
    patientId: "p005",
    date: "2025-05-25",
    reportType: "Pulmonary Function Test",
    summary: "Mild obstruction detected.",
    details:
      "Spirometry indicates mild airflow obstruction consistent with asthma. Patient advised on medication adjustment.",
  },
];

export default function NurseReports() {
  const [selectedReport, setSelectedReport] = useState(null);

  return (
    <section className="p-6 max-w-7xl mx-auto">
      <h1 className="text-4xl font-extrabold mb-6 text-[#142139]">Medical Reports</h1>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {reportsData.map((report) => (
          <div
            key={report.id}
            onClick={() => setSelectedReport(report)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") setSelectedReport(report);
            }}
            className="cursor-pointer rounded-lg bg-white shadow-lg p-5 hover:shadow-xl transition-shadow"
            aria-label={`View full report of ${report.reportType} for ${report.patientName}`}
          >
            <h2 className="text-xl font-semibold text-[#007eb1] mb-2">{report.reportType}</h2>
            <p className="text-gray-700 font-medium">{report.patientName}</p>
            <p className="text-gray-500 text-sm mb-4">{report.date}</p>
            <p className="text-gray-600 italic line-clamp-3">{report.summary}</p>
          </div>
        ))}
      </div>

      {/* نافذة تفاصيل التقرير */}
      {selectedReport && (
        <ReportDetailsModal report={selectedReport} onClose={() => setSelectedReport(null)} />
      )}
    </section>
  );
}

function ReportDetailsModal({ report, onClose }) {
  if (!report) return null;

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
        className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6 overflow-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-2xl font-bold"
          aria-label="Close report details"
        >
          ×
        </button>

        <h2 id="modal-title" className="text-3xl font-bold text-[#142139] mb-4">
          {report.reportType}
        </h2>
        <p className="text-gray-700 font-semibold mb-2">
          Patient: {report.patientName} (ID: {report.patientId})
        </p>
        <p className="text-gray-500 mb-6">{report.date}</p>

        <div
          id="modal-description"
          className="text-gray-800 whitespace-pre-line"
        >
          {report.details}
          
        </div>
      </div>
    </div>
  );
}
