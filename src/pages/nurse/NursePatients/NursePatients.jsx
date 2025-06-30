import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import FilterDropdown from "@/components/ui/FilterDropdown";


const diseases = ["Diabetes", "Hypertension", "Asthma", "Arthritis", "Heart Disease", "Cancer", "Flu"];
const names = ["Ahmed", "Mona", "Salma", "Khaled", "Youssef", "Fatma", "Nour", "Amr", "Laila", "Hana", "Mohamed", "Nadine"];

const generateMockPatients = (count = 40) => {
  return Array.from({ length: count }, (_, i) => {
    const name = `${names[Math.floor(Math.random() * names.length)]} ${names[Math.floor(Math.random() * names.length)]}`;
    const age = Math.floor(Math.random() * 50) + 20;
    const disease = diseases[Math.floor(Math.random() * diseases.length)];
    const lastVisit = new Date(Date.now() - Math.random() * 10000000000).toISOString().split("T")[0];
    return {
      id: i + 1,
      name,
      age,
      disease,
      lastVisit,
    };
  });
};

const mockPatients = generateMockPatients(40); 

export default function Patients() {
  const [search, setSearch] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");

  const filteredPatients = mockPatients.filter((patient) => {
    const matchesSearch = patient.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = selectedFilter === "All" || patient.disease === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const diseaseOptions = ["All", ...new Set(mockPatients.map((p) => p.disease))];

  return (
    <div className="p-4 space-y-4 min-h-screen bg-gray-50">
      <h2 className="text-2xl font-semibold text-gray-800">Patients</h2>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        <Input
          placeholder="Search by name..."
          className="w-full sm:w-1/2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <FilterDropdown
          options={diseaseOptions}
          selected={selectedFilter}
          onChange={setSelectedFilter}
        />
      </div>

      {filteredPatients.length === 0 ? (
        <p className="text-center text-gray-500 pt-10">No patients found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
          {filteredPatients.map((patient) => (
            <Card key={patient.id} className="shadow-sm hover:shadow-md transition">
              <CardContent className="space-y-2 p-4">
                <h3 className="text-lg font-bold text-gray-800">{patient.name}</h3>
                <p className="text-sm text-gray-600">Age: {patient.age}</p>
                <p className="text-sm text-gray-600">Disease: {patient.disease}</p>
                <p className="text-sm text-gray-600">Last Visit: {patient.lastVisit}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
