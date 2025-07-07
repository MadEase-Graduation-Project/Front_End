import DataTable from "@/components/role/admin/DataTable";
import ConfirmationDialog from "@/components/ui/ConfirmationDialog";
import AppointmentDialog from "@/components/ui/AppointmentDialog";
import {
  fetchAppointments,
  removeUserAppointment,
} from "@/store/slices/appointmentSlice";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Settings } from "lucide-react";
import FilterColumns from "@/components/role/admin/FilterColumns";
import {
  selectAllAppointments,
  selectAppointmentsError,
  selectAppointmentsLoading,
} from "@/store/selectors";
import { isEmpty } from "@/utils/objectUtils";

export default function AppointmentsPage() {
  const dispatch = useDispatch();

  const data = useSelector(selectAllAppointments);
  const loading = useSelector(selectAppointmentsLoading);
  const error = useSelector(selectAppointmentsError);

  // State for dialogs
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [appointmentDialogOpen, setAppointmentDialogOpen] = useState(false);
  const [isCreateMode, setIsCreateMode] = useState(false);
  const [appointmentToDelete, setAppointmentToDelete] = useState(null);
  const [appointmentToEdit, setAppointmentToEdit] = useState(null);

  // // Open create appointment dialog
  // const handleCreateAppointment = () => {
  //   setIsCreateMode(true);s
  //   setAppointmentToEdit(null);
  //   setAppointmentDialogOpen(true);
  // };

  useEffect(() => {
    if (isEmpty(data)) dispatch(fetchAppointments());
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
      dispatch(removeUserAppointment(appointmentToDelete._id));
      console.log("Deleting appointment:", appointmentToDelete);
      // Close the dialog after deletion
      setDeleteDialogOpen(false);
    }
  };

  //* Column definitions
  // All available columns
  const allColumns = useMemo(
    () => [
      { key: "patientName", label: "Patient Name", sortable: true },
      { key: "doctorName", label: "Doctor Name", sortable: true },
      {
        key: "appointmentDate",
        label: "Appointment Date",
        sortable: true,
        type: "date",
      },
      { key: "priority", label: "Priority", sortable: true },
      { key: "createdAt", label: "Created At", sortable: true, type: "date" },
      { key: "updatedAt", label: "Updated At", sortable: true, type: "date" },
    ],
    []
  );

  // State for selected columns
  const [selectedColumnKeys, setSelectedColumnKeys] = useState([
    "patientName",
    "doctorName",
    "appointmentDate",
  ]);

  // Column selector options for react-select
  const columnOptions = allColumns.map((col) => ({
    value: col.key,
    label: col.label,
  }));

  // State for column selector dialog
  const [showColumnSelector, setShowColumnSelector] = useState(false);

  // Filtered columns based on selection
  const columns = useMemo(() => {
    return allColumns.filter((col) => selectedColumnKeys.includes(col.key));
  }, [selectedColumnKeys, allColumns]);
  //* End of column definitions

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Appointments</h1>
        <button
          onClick={() => setShowColumnSelector(true)}
          className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-gray-700 transition-colors"
        >
          <Settings size={18} />
          <span>Customize Columns</span>
        </button>
      </div>

      {/* Column selector dialog */}
      <FilterColumns
        allColumns={allColumns}
        options={columnOptions}
        selected={selectedColumnKeys}
        onSelectedChange={setSelectedColumnKeys}
        isOpen={showColumnSelector}
        onClose={() => setShowColumnSelector(false)}
      />

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
