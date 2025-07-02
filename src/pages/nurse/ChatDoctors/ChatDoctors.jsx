import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { HiOutlineUserCircle } from "react-icons/hi";

const doctors = [
  { id: 1, name: "Dr. Amina Saleh", message: "Please check the patient's fever." },
  { id: 2, name: "Dr. Nader Youssef", message: "Results are ready." },
  { id: 3, name: "Dr. Fatma Adel", message: "I'll update you soon." },
  { id: 4, name: "Dr. Tamer Lotfy", message: "Patient transferred." },
];

export default function ChatDoctors() {
  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold text-[#007eb1]">Chat with Doctors</h2>
      <Input placeholder="Search doctors..." className="max-w-sm" />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {doctors.map((doctor) => (
          <Card key={doctor.id} className="bg-[#f5f9fc]">
            <CardContent className="flex items-center gap-4 p-4">
              <HiOutlineUserCircle size={40} className="text-[#007eb1]" />
              <div>
                <p className="font-semibold">{doctor.name}</p>
                <p className="text-gray-600 text-sm">{doctor.message}</p>
              </div>
              <Button className="ml-auto">Chat</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
