import DiagnosisCard from "./components/DiagnosisCard";

export default function MyDiagnoses() {
  const diagnosis = {
    id: "d1", // unique for layoutId
    title: "Migraine Diagnosis",
    doctorName: "Sarah Ahmed",
    doctorImg: "https://randomuser.me/api/portraits/women/44.jpg", // added image
    description: "First diagnosis for endpoint testing only",
    symptoms: ["Headache", "Cold", "Laziness"],
    medications: [
      "Paracetamol 500 mg – 1 tab every 8 h",
      "Ibuprofen 200 mg – after meals",
      "Vitamin C 500 mg – daily",
    ],
    recommendations: "Stay away from junk food",
    followUp: "Next Sunday",
    notes: "None",
  };

  return (
    <div className="flex flex-col w-full max-w-2xl mx-auto h-full gap-6">
      <DiagnosisCard diagnosis={diagnosis} />
      <DiagnosisCard diagnosis={diagnosis} />
      <DiagnosisCard diagnosis={diagnosis} />
      <DiagnosisCard diagnosis={diagnosis} />
    </div>
  );
}
