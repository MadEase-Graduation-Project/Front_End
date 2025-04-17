import DataTable from "@/components/AdminComps/DataTable";
import ConfirmationDialog from "@/components/ui/ConfirmationDialog";
import AppointmentDialog from "@/components/ui/AppointmentDialog";
import {
  fetchAppointments,
  removeAppointment,
} from "@/store/Slices/Appointments";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Appointments() {
  const dispatch = useDispatch();
  const { items: data, loading } = useSelector((state) => state.appointments);

  // State for dialogs
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [appointmentDialogOpen, setAppointmentDialogOpen] = useState(false);
  const [isCreateMode, setIsCreateMode] = useState(false);
  const [appointmentToDelete, setAppointmentToDelete] = useState(null);
  const [appointmentToEdit, setAppointmentToEdit] = useState(null);

  // Open create appointment dialog
  const handleCreateAppointment = () => {
    setIsCreateMode(true);
    setAppointmentToEdit(null);
    setAppointmentDialogOpen(true);
  };

  useEffect(() => {
    dispatch(fetchAppointments());
  }, [dispatch]);

  const handleRowClick = (item) => {
    console.log("Row clicked:", item);
  };

  // Open edit dialog when edit is clicked
  const handleEdit = (item) => {
    setIsCreateMode(false);
    setAppointmentToEdit(item);
    setAppointmentDialogOpen(true);
  };

  // Open confirmation dialog when delete is clicked
  const handleDelete = (item) => {
    setAppointmentToDelete(item);
    setDeleteDialogOpen(true);
  };

  // Actual delete function when confirmed
  const confirmDelete = () => {
    if (appointmentToDelete) {
      dispatch(removeAppointment(appointmentToDelete._id));
      console.log("Deleting appointment:", appointmentToDelete);
      // Close the dialog after deletion
      setDeleteDialogOpen(false);
    }
  };

  const columns = [
    { key: "patientName", label: "Patient Name", sortable: true },
    { key: "doctorName", label: "Doctor Name", sortable: true },
    {
      key: "appointmentDate",
      label: "Appointment Date",
      sortable: true,
      type: "date",
    },
    { key: "priority", label: "Priority", sortable: true },
  ];

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Appointments</h1>
        <button
          onClick={handleCreateAppointment}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <span>+ New Appointment</span>
        </button>
      </div>

      <DataTable
        columns={columns}
        data={data}
        loading={loading}
        selectable={true}
        showActions={true}
        onRowClick={handleRowClick}
        onEdit={handleEdit}
        onDelete={handleDelete}
        pageSize={5}
      />

      <ConfirmationDialog
        isOpen={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Appointment"
        message={`Are you sure you want to delete the appointment for ${
          appointmentToDelete?.patientName || "this patient"
        }?`}
        confirmText="Delete"
        cancelText="Cancel"
        confirmButtonClass="bg-red-600 hover:bg-red-700"
      />

      <AppointmentDialog
        isOpen={appointmentDialogOpen}
        onClose={() => setAppointmentDialogOpen(false)}
        appointment={appointmentToEdit}
        isCreateMode={isCreateMode}
      />
    </div>
  );
}
