import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { fetchShowPatientById } from "@/store/slices/patientSlice";
import { fetchAppointments } from "@/store/slices/appointmentSlice";
import { selectAllAppointments, selectShowPatientById, selectPatientsLoading } from "@/store/selectors";

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
  const [fetchedPatients, setFetchedPatients] = useState({});
  const dispatch = useDispatch();
  
  // Use the same selectors as the chart
  const Appointments = useSelector(selectAllAppointments);
  const currentPatient = useSelector(selectShowPatientById); // This is a single patient object
  const loading = useSelector(selectPatientsLoading);

  // Memoize unique patient IDs from appointments (adjusted for API structure)
  const uniquePatientIds = useMemo(() => {
    return [...new Set(
      Appointments
        .map(a => a.patientId?._id || a.patientId) // Handle both object and string formats
        .filter(Boolean) // Remove null/undefined values
    )];
  }, [Appointments]);

  // Fetch appointments once (same as chart)
  useEffect(() => {
    dispatch(fetchAppointments());
  }, [dispatch]);

  // Store the current patient when it's fetched
  useEffect(() => {
    if (currentPatient && currentPatient._id) {
      setFetchedPatients(prev => ({
        ...prev,
        [currentPatient._id]: currentPatient
      }));
    }
  }, [currentPatient]);

  // Fetch patients individually based on appointment data
  useEffect(() => {
    if (uniquePatientIds.length > 0) {
      uniquePatientIds.forEach(id => {
        if (!fetchedPatients[id]) {
          dispatch(fetchShowPatientById(id));
        }
      });
    }
  }, [dispatch, uniquePatientIds, fetchedPatients]);

  // Get patient list from the fetchedPatients
  const patients = useMemo(() => {
    console.log('fetchedPatients content:', fetchedPatients);
    console.log('uniquePatientIds:', uniquePatientIds);
    
    const result = uniquePatientIds.map(id => fetchedPatients[id]).filter(Boolean);
    console.log('Patients result:', result);
    return result;
  }, [fetchedPatients, uniquePatientIds]);

  // Check if we're still loading any patients
  const isLoading = loading || (uniquePatientIds.length > 0 && uniquePatientIds.some(id => !fetchedPatients[id]));

  const handlePatientClick = (patient) => {
    setSelectedPatientId(patient._id);
    onPatientSelect(patient);
  };

  // Use patients from store if available, otherwise fallback
  const patientsToDisplay = patients.length > 0 ? patients : fallbackPatients;

  const sortedPatients = [...patientsToDisplay].sort((a, b) => {
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

  // Show loading state if we're fetching patients
  if (isLoading && patients.length === 0 && uniquePatientIds.length > 0) {
    return (
      <div className="space-y-3">
        <Card className="p-4">
          <CardContent>
            <p>Loading patients... ({uniquePatientIds.length} patients to fetch)</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show message if no appointments found
  if (uniquePatientIds.length === 0) {
    return (
      <div className="space-y-3">
        <Card className="p-4">
          <CardContent>
            <p>No appointments found. Using fallback patient data.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

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