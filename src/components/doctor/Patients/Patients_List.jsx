import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { fetchAllPatients, fetchShowPatients } from "@/store/slices/patientSlice";

const fallbackPatients = [
  {
    _id: "fallback-1",
    name: "Sarah Elmasry",
    gender: "Female",
    dateOfBirth: "1992-03-15",
    email: "sarah.elmasry@example.com",
    phone: "+201000112233",
    city: "Cairo",
    country: "Egypt",
    createdAt: "2023-11-15T10:00:00Z",
    emergencyContact: {
      name: "Laila Elmasry",
      relationship: "Mother",
      phone: "+201234567890",
    },
  },
  {
    _id: "fallback-2",
    name: "Mohamed Hisham",
    gender: "Male",
    dateOfBirth: "1988-07-22",
    email: "mohamed.hisham@example.com",
    phone: "+201555667788",
    city: "Alexandria",
    country: "Egypt",
    createdAt: "2023-09-10T14:30:00Z",
    emergencyContact: {
      name: "Ahmed Hisham",
      relationship: "Brother",
      phone: "+201098765432",
    },
  },
  {
    _id: "fallback-3",
    name: "Nour Khaled",
    gender: "Female",
    dateOfBirth: "2001-12-05",
    email: "nour.khaled@example.com",
    phone: "+201112223344",
    city: "Giza",
    country: "Egypt",
    createdAt: "2024-01-20T09:45:00Z",
    emergencyContact: {
      name: "Khaled Youssef",
      relationship: "Father",
      phone: "+201234001122",
    },
  },
];


export const Patients_List = ({ onPatientSelect, sortBy }) => {
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const dispatch = useDispatch();
  const patientsFromStore = useSelector(selectShowPatients);

  useEffect(() => {
    dispatch(fetchShowPatients());
  }, [dispatch]);

const handlePatientClick = (patient) => {
  setSelectedPatientId(patient._id);
  onPatientSelect(patient);
};



  const sortedPatients = [...(patientsFromStore ?? fallbackPatients)].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.createdAt) - new Date(a.createdAt);
      case "oldest":
        return new Date(a.createdAt) - new Date(b.createdAt);
      case "alphabetical":
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  return (
    <div className="space-y-3">
      {sortedPatients.map((patient) => (
        <Card
          key={patient._id}
          className={`p-2 flex items-center space-x-3 cursor-pointer hover:bg-gray-200 ${
            selectedPatientId === patient._id ? "bg-gray-200" : ""
          }`}
          onClick={() => handlePatientClick(patient)}
        >
          <CardContent className="flex items-center space-x-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src="" alt={patient.name} />
              <AvatarFallback>{patient.name?.charAt(0) || "U"}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{patient.name || "Unknown"}</p>
              <p className="text-xs text-gray-500">
                Registered:{" "}
                {patient.createdAt
                  ? new Date(patient.createdAt).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
