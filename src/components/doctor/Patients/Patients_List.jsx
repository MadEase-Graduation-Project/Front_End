import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { fetchAllPatients } from '@/store/Slices/Patients';

export const Patients_List = ({ onPatientSelect, sortBy }) => {
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const dispatch = useDispatch();
  const { items: patients, loading, error } = useSelector((state) => state.patients);

  useEffect(() => {
    dispatch(fetchAllPatients(localStorage.getItem("doctorToken")));
  }, [dispatch]);

  const handlePatientClick = (patientId) => {
    setSelectedPatientId(patientId);
    onPatientSelect(patientId);
  };

  const sortedPatients = [...(patients || [])].sort((a, b) => {
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
            selectedPatientId === patient._id ? 'bg-gray-200' : ''
          }`}
          onClick={() => handlePatientClick(patient._id)}
        >
          <CardContent className="flex items-center space-x-3">
            <Avatar className="w-10 h-10" />
            <div>
              <p className="font-semibold">{patient.name}</p>
              <p className="text-xs text-gray-500">
                Registered: {new Date(patient.createdAt).toLocaleDateString()}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
