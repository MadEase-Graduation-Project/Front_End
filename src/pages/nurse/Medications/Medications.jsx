import { Card, CardContent } from "@/components/ui/card";
import FilterDropdown from "@/components/ui/FilterDropdown";
import { Input } from "@/components/ui/input";

const medications = [
  { name: "Paracetamol", dosage: "500mg", frequency: "3 times/day" },
  { name: "Amoxicillin", dosage: "250mg", frequency: "2 times/day" },
  { name: "Aspirin", dosage: "100mg", frequency: "1 time/day" },
  { name: "Ibuprofen", dosage: "400mg", frequency: "3 times/day" },
  { name: "Cough Syrup", dosage: "10ml", frequency: "2 times/day" },
];

export default function Medications() {
  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold text-[#007eb1]">Medication List</h2>
      <div className="flex items-center gap-4 flex-wrap">
        <Input placeholder="Search medications..." className="max-w-sm" />
        <FilterDropdown options={["All", "Daily", "Frequent"]} />
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {medications.map((med, i) => (
          <Card key={i} className="bg-[#f5f9fc]">
            <CardContent className="p-4 space-y-2">
              <h3 className="font-semibold text-lg text-[#007eb1]">{med.name}</h3>
              <p className="text-gray-700">Dosage: {med.dosage}</p>
              <p className="text-gray-700">Frequency: {med.frequency}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
