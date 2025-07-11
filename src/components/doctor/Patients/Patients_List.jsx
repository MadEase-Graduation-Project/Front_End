import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { fetchShowPatientById } from "@/store/slices/patientSlice";
import { fetchAppointments } from "@/store/slices/appointmentSlice";
import {
  selectAllAppointments,
  selectShowPatientById,
  selectPatientsLoading,
} from "@/store/selectors";

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
];

export const Patients_List = ({ onPatientSelect, sortBy }) => {
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [fetchedPatients, setFetchedPatients] = useState({});
  const [fetchedPatientIds, setFetchedPatientIds] = useState(new Set());

  const dispatch = useDispatch();
  const appointments = useSelector(selectAllAppointments);
  const loading = useSelector(selectPatientsLoading);

  // Extract unique patient IDs
  const uniquePatientIds = useMemo(() => {
    const ids = [
      ...new Set(
        appointments
          .map((a) => (a.patientId?._id || a.patientId))
          .filter(Boolean)
      ),
    ];
    console.log("✅ Unique patient IDs from appointments:", ids);
    return ids;
  }, [appointments]);

  // Fetch appointments on mount
  useEffect(() => {
    dispatch(fetchAppointments());
  }, [dispatch]);

  // Fetch missing patients
  const fetchMissingPatients = async () => {
    console.log("🔁 Starting patient fetch loop");

    for (const id of uniquePatientIds) {
      if (!fetchedPatientIds.has(id) && !fetchedPatients[id]) {
        console.log(`➡️ Fetching patient with ID: ${id}`);

        try {
          const resultAction = await dispatch(fetchShowPatientById(id));
          console.log("🧾 Result Action:", resultAction);

          if (fetchShowPatientById.fulfilled.match(resultAction)) {
            const payload = resultAction.payload;

            if (!payload) {
              console.error("❌ No payload returned for patient ID:", id);
              continue;
            }

            const patient = payload?.data || payload;

            if (patient && patient._id) {
              console.log("✅ Patient fetched:", patient);
              setFetchedPatients((prev) => ({
                ...prev,
                [patient._id]: patient,
              }));
              setFetchedPatientIds((prev) => new Set([...prev, id]));
            } else {
              console.warn("⚠️ Invalid patient structure:", payload);
            }
          } else {
            console.error("❌ fetchShowPatientById thunk was rejected:", resultAction);
          }
        } catch (err) {
          console.error("❌ Exception during patient fetch:", err);
        }
      } else {
        console.log(`⏩ Already fetched ID: ${id}`);
      }
    }
  };

  // Trigger fetch
  useEffect(() => {
    if (uniquePatientIds.length > 0) {
      fetchMissingPatients();
    }
  }, [uniquePatientIds]);

  // Construct the patient list from fetched data
  const patients = useMemo(() => {
    const result = uniquePatientIds.map((id) => fetchedPatients[id]).filter(Boolean);
    console.log("📋 Current patients to render:", result);
    return result;
  }, [fetchedPatients, uniquePatientIds]);

  const isLoading =
    loading ||
    (uniquePatientIds.length > 0 && patients.length < uniquePatientIds.length);

  const handlePatientClick = (patient) => {
    setSelectedPatientId(patient._id);
    onPatientSelect(patient);
  };

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

  if (isLoading && patients.length === 0 && uniquePatientIds.length > 0) {
    return (
      <div className="space-y-3">
        <Card className="p-4">
          <CardContent>
            <p className="text-sm text-gray-500">
              Fetched: {patients.length} / {uniquePatientIds.length}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

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
