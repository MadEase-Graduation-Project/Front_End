import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, Edit, Save, X } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  selectAppointmentsError,
  selectAppointmentsLoading,
  selectSelectedAppointment,
} from "@/store/selectors";
import { fetchAppointmentById } from "@/store/slices/appointmentSlice";

export default function ShowAppointment({ params }) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(null);

  // user selectors -------------
  const item = useSelector(selectSelectedAppointment);
  const loading = useSelector(selectAppointmentsLoading);
  const errorData = useSelector(selectAppointmentsError);
  // ----------------------------
  useEffect(() => {
    if (id) {
      dispatch(fetchAppointmentById(id));
    }
  }, [id, dispatch]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    console.log("Saving item:", editedData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setEditedData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Appointment Not Found</h1>
          <p className="text-muted-foreground mb-4">
            The Appointment you`re looking for doesn`t exist.
          </p>
          <Button onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold">
              {item.patientName} appointment with dr.{item.doctorName}
            </h1>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {!isEditing ? (
            <Button onClick={handleEdit}>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          ) : (
            <>
              <Button variant="outline" onClick={handleCancel}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1  gap-6">
        {/* Main Information */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Appointment Information</CardTitle>
              <CardDescription>
                Basic details and appointment information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Patient</Label>
                  <p className="text-sm mt-1">{item.patientName}</p>
                </div>
                <div>
                  <Label htmlFor="email">Doctor</Label>
                  <p className="text-sm mt-1">{item.doctorName ?? "non"}</p>
                </div>
                <div>
                  <Label htmlFor="phone">Priority</Label>
                  <p className="text-sm mt-1">{item.priority ?? "non"}</p>
                </div>
                <div>
                  <Label htmlFor="phone">Date</Label>
                  <p className="text-sm mt-1">
                    {new Date(item.appointmentDate).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <Label>Treatment Created</Label>
                  <p className="text-sm mt-1">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <Label>Last Update</Label>
                  <p className="text-sm mt-1">
                    {new Date(item.updatedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
