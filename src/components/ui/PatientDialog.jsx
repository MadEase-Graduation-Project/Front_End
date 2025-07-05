import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function PatientDialog({ patient }) {
  const navigate = useNavigate();

  if (!patient) return null;

  return (
    <Card className="shadow-sm transition">
      <CardContent className="space-y-2 p-4">
        <h3 className="text-lg font-bold text-gray-800">{patient.name}</h3>
        <p className="text-sm text-gray-600">Age: {patient.age}</p>
        <p className="text-sm text-gray-600">Disease: {patient.disease}</p>
        <p className="text-sm text-gray-600">Last Visit: {patient.lastVisit}</p>

        <Button
          className="mt-2 w-full bg-blue-600 text-white hover:bg-blue-700 transition"
          onClick={() =>
            navigate(`/nurse/patients/${patient.id}`, { state: { patient } }) 
          }
        >
          View More
        </Button>
      </CardContent>
    </Card>
  );
}
