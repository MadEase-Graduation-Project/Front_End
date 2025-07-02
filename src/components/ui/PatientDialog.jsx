import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function PatientDialog({ patient }) {
  if (!patient) return null;

  return (
    <Dialog>
      <Card className="shadow-sm transition">
        <CardContent className="space-y-2 p-4">
          <h3 className="text-lg font-bold text-gray-800">{patient.name}</h3>
          <p className="text-sm text-gray-600">Age: {patient.age}</p>
          <p className="text-sm text-gray-600">Disease: {patient.disease}</p>
          <p className="text-sm text-gray-600">Last Visit: {patient.lastVisit}</p>

          
          <DialogTrigger asChild>
            <Button className="mt-2 w-full bg-blue-600 text-white hover:bg-blue-700 transition">
            View More
            </Button>
          </DialogTrigger>
        </CardContent>
      </Card>

      
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Patient Details</DialogTitle>
        </DialogHeader>
        <div className="flex items-center gap-4 mb-4">
          <Avatar className="w-16 h-16">
            <AvatarImage src={patient.image} />
            <AvatarFallback>{patient.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-lg font-semibold">{patient.name}</h3>
            <p className="text-sm text-gray-600">Email: {patient.email}</p>
            <p className="text-sm text-gray-600">Patient ID: #{patient.id}</p>
          </div>
        </div>
        <div className="space-y-2 text-sm text-gray-700">
          <p><strong>Medical Condition:</strong> {patient.disease}</p>
          <p><strong>Age:</strong> {patient.age}</p>
          <p><strong>Last Visit:</strong> {patient.lastVisit}</p>
          <p><strong>Medical History:</strong> {patient.history}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
