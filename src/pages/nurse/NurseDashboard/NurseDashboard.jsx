import FilterDropdown from "@/components/ui/FilterDropdown";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const patientStats = [
  { name: "Mon", patients: 30 },
  { name: "Tue", patients: 45 },
  { name: "Wed", patients: 60 },
  { name: "Thu", patients: 50 },
  { name: "Fri", patients: 70 },
];

const NurseDashboard = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Nurse Dashboard, Dr. Salma</h1>
        <FilterDropdown
          label="Filter by Department"
          options={["Cardiology", "Neurology", "Pediatrics"]}
          onChange={(val) => console.log("Filtered by:", val)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-500">Total Patients</p>
            <p className="text-2xl font-semibold">128</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-500">Appointments Today</p>
            <p className="text-2xl font-semibold">23</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-500">Messages</p>
            <p className="text-2xl font-semibold">5 New</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-6">
          <h2 className="text-lg font-bold mb-4">Patients This Week</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={patientStats}>
              <XAxis dataKey="name" stroke="#8884d8" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="patients" fill="#007eb1" barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default NurseDashboard;
