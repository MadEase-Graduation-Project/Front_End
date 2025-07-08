import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, CalendarCheck, Stethoscope, FileText, Activity } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const NurseDashboard = () => {
  const [stats] = useState({
    patients: 8,
    appointments: 6,
    reports: 5,
    emergencies: 5,
  });

  const [recentActivities] = useState([
    { id: 1, message: "Emergency alert: Patient #23 reported chest pain", time: "10 mins ago" },
    { id: 2, message: "New appointment scheduled with Dr. Ayman", time: "30 mins ago" },
    { id: 3, message: "Lab results uploaded for Patient #12", time: "1 hour ago" },
  ]);

  const weeklyVisits = [
    { day: "Sun", visits: 10 },
    { day: "Mon", visits: 15 },
    { day: "Tue", visits: 8 },
    { day: "Wed", visits: 20 },
    { day: "Thu", visits: 18 },
    { day: "Fri", visits: 5 },
    { day: "Sat", visits: 7 },
  ];

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold text-gray-800">Nurse Dashboard</h2>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="flex items-center gap-4 py-4">
            <Stethoscope className="w-8 h-8 text-blue-500" />
            <div>
              <p className="text-sm text-gray-500">Total Patients</p>
              <p className="text-xl font-semibold">{stats.patients}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 py-4">
            <CalendarCheck className="w-8 h-8 text-green-500" />
            <div>
              <p className="text-sm text-gray-500">Appointments</p>
              <p className="text-xl font-semibold">{stats.appointments}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 py-4">
            <FileText className="w-8 h-8 text-yellow-500" />
            <div>
              <p className="text-sm text-gray-500">Reports</p>
              <p className="text-xl font-semibold">{stats.reports}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 py-4">
            <AlertTriangle className="w-8 h-8 text-red-500" />
            <div>
              <p className="text-sm text-gray-500">Emergencies</p>
              <p className="text-xl font-semibold">{stats.emergencies}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Visits Chart */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Weekly Visits</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={weeklyVisits}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="visits" fill="#4F46E5" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Activities */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Recent Activities</h3>
        <ul className="space-y-2 text-sm text-gray-700">
          {recentActivities.map((activity) => (
            <li key={activity.id} className="flex items-center gap-2 bg-white shadow-sm p-3 rounded-lg">
              <Activity className="w-4 h-4 text-indigo-600" />
              <span className="flex-1">{activity.message}</span>
              <span className="text-gray-400 text-xs">{activity.time}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NurseDashboard;
