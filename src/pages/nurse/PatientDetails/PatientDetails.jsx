import { useParams, useNavigate } from "react-router-dom";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit, Download } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import html2pdf from "html2pdf.js";

export default function PatientDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const pdfRef = useRef();

  useEffect(() => {
    const mockPatient = {
      id,
      name: "Fatma El Zahraa",
      age: 35,
      email: "fatma@example.com",
      disease: "Diabetes",
      lastVisit: "2025-06-15",
      history:
        "Diagnosed with type 2 diabetes in 2021. Patient follows a low-carb diet and takes daily medication. Blood sugar levels monitored weekly. Regular checkups every 3 months with a specialist. No complications observed so far.",
      treatmentPlan:
        "1. Metformin 500mg twice daily.\n2. Follow diabetic diet plan.\n3. Weekly blood sugar testing.\n4. Monthly dietician consultation.",
      currentStatus:
        "Stable, no complications. Blood sugar within recommended range.",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      visitHistory: [
        { date: "2024-01", visits: 1 },
        { date: "2024-02", visits: 2 },
        { date: "2024-03", visits: 1 },
        { date: "2024-04", visits: 3 },
        { date: "2024-05", visits: 1 },
        { date: "2024-06", visits: 2 },
      ],
      previousVisits: [
        "2025-06-15",
        "2025-05-01",
        "2025-03-20",
        "2025-01-08",
      ],
    };

    const timeout = setTimeout(() => setPatient(mockPatient), 500);
    return () => clearTimeout(timeout);
  }, [id]);

  const handleDownloadPDF = () => {
    const buttons = document.querySelectorAll(".hide-on-pdf");

    // إخفاء الأزرار
    buttons.forEach((btn) => (btn.style.display = "none"));

    const element = pdfRef.current;
    html2pdf()
      .set({
        margin: 0.5,
        filename: `patient_${patient.name}.pdf`,
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
      })
      .from(element)
      .save()
      .then(() => {
        // إعادة إظهار الأزرار
        buttons.forEach((btn) => (btn.style.display = ""));
      });
  };

  if (!patient) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-6 space-y-6" ref={pdfRef}>
      <div className="flex items-center justify-between hide-on-pdf">
        <Button variant="outline" onClick={() => navigate(-1)} className="hide-on-pdf">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" className="hide-on-pdf">
            <Edit className="mr-2 h-4 w-4" /> Edit
          </Button>
          <Button
            onClick={handleDownloadPDF}
            className="bg-green-600 text-white hover:bg-green-700 hide-on-pdf"
          >
            <Download className="mr-2 h-4 w-4" /> PDF
          </Button>
        </div>
      </div>

      <h1 className="text-2xl font-bold">Patient Details</h1>

      <div className="flex items-center gap-6">
        <Avatar className="w-20 h-20">
          <AvatarImage src={patient.image} />
          <AvatarFallback>{patient.name?.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-xl font-semibold">{patient.name}</h2>
          <p className="text-gray-600 text-sm">Email: {patient.email}</p>
          <p className="text-gray-600 text-sm">ID: #{patient.id}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
        <p>
          <strong>Age:</strong> {patient.age}
        </p>
        <p>
          <strong>Disease:</strong> {patient.disease}
        </p>
        <p>
          <strong>Last Visit:</strong> {patient.lastVisit}
        </p>
        <p>
          <strong>Current Status:</strong> {patient.currentStatus}
        </p>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-1">Medical History</h3>
        <p className="text-gray-700 text-sm whitespace-pre-line">
          {patient.history}
        </p>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-1">Treatment Plan</h3>
        <p className="text-gray-700 text-sm whitespace-pre-line">
          {patient.treatmentPlan}
        </p>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Previous Visits</h3>
        <ul className="list-disc pl-5 text-sm text-gray-700">
          {patient.previousVisits.map((visit, index) => (
            <li key={index}>{visit}</li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Hospital Visits Chart</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={patient.visitHistory}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="visits" fill="#4F46E5" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
