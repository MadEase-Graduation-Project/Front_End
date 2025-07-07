import DataTable from "@/components/role/admin/DataTable";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPatients } from "@/store/slices/patientSlice";
import ConfirmationDialog from "@/components/ui/ConfirmationDialog";
import { Settings } from "lucide-react";
import FilterColumns from "@/components/role/admin/FilterColumns";
import {
  selectAllPatients,
  selectPatientsError,
  selectPatientsLoading,
} from "@/store/selectors";
import { isEmpty } from "@/utils/objectUtils";
import ViewTable from "@/components/role/admin/ViewTable";

export default function PatientsPage() {
  const dispatch = useDispatch();

  const data = useSelector(selectAllPatients);
  const loading = useSelector(selectPatientsLoading);
  const error = useSelector(selectPatientsError);

  // State for dialogs
  // const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  //  const [patientDialogOpen, setPatientDialogOpen] = useState(false);
  // const [isCreateMode, setIsCreateMode] = useState(false);
  // const [patientToDelete, setPatientToDelete] = useState(null);
  // const [patientToEdit, setPatientToEdit] = useState(null);

  useEffect(() => {
    if (isEmpty(data)) dispatch(fetchAllPatients());
  }, [dispatch]);

  const handleRowClick = (item) => {
    console.log("Row clicked:", item);
  };

  const handleEdit = (item) => {
    console.log("Edit item:", item);
  };

  const handleDelete = (item) => {
    // setPatientToDelete(item);
    // setDeleteDialogOpen(true);
    console.log("Delete item:", item);
  };

  // const confirmDelete = () => {
  //   if (patientToDelete) {
  //     console.log("Deleting patient:", patientToDelete);
  //     // Close the dialog after deletion
  //     setDeleteDialogOpen(false);
  //   }
  // };

  //* Column definitions
  // All available columns
  const allColumns = useMemo(
    () => [
      { key: "name", label: "Name", sortable: true },
      { key: "email", label: "Email", sortable: true },
      { key: "city", label: "City", sortable: true },
      { key: "country", label: "Country", sortable: true },
      { key: "phone", label: "Phone", sortable: true },
      { key: "gender", label: "Gender", sortable: true },
      { key: "isVerified", label: "Verified", sortable: true, type: "boolean" },
      { key: "createdAt", label: "Created At", sortable: true, type: "date" },
      { key: "updatedAt", label: "Updated At", sortable: true, type: "date" },
    ],
    []
  );

  // State for selected columns
  const [selectedColumnKeys, setSelectedColumnKeys] = useState([
    "name",
    "email",
    "city",
    "phone",
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
        <h1 className="text-2xl font-bold">Patients</h1>
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

      {/* Data table */}
      <ViewTable
        columns={columns}
        data={data}
        loading={loading}
        selectable={true}
        showActions={true}
        onRowClick={handleRowClick}
        onEdit={handleEdit}
        onDelete={handleDelete}
        pageSize={10}
      />

      {/* <ConfirmationDialog
        isOpen={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Patient"
        message={`Are you sure you want to delete the data of patient ${
          patientToDelete?.name || "this patient"
        }?`}
        confirmText="Delete"
        cancelText="Cancel"
        confirmButtonClass="bg-red-600 hover:bg-red-700"
      /> */}
    </div>
  );
}
