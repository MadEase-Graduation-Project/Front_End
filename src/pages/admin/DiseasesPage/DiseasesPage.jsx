import DataTable from "@/components/role/admin/DataTable";
import ConfirmationDialog from "@/components/ui/ConfirmationDialog";
import { fetchAllDiseases, removeDisease } from "@/store/slices/diseaseSlice";
import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Settings } from "lucide-react";
import FilterColumns from "@/components/role/admin/FilterColumns";

export default function DiseasesPage() {
  const dispatch = useDispatch();
  const { items: data, loading } = useSelector((state) => state.diseases);

  // State for dialogs
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [diseaseToDelete, setDiseaseToDelete] = useState(null);

  useEffect(() => {
    dispatch(fetchAllDiseases());
  }, [dispatch]);

  const handleRowClick = (item) => {
    console.log("Row clicked:", item);
  };

  const handleEdit = (item) => {
    console.log("Edit item:", item);
  };

  // Open confirmation dialog when delete is clicked
  const handleDelete = (item) => {
    setDiseaseToDelete(item);
    setDeleteDialogOpen(true);
  };

  // Actual delete function when confirmed
  const confirmDelete = () => {
    if (diseaseToDelete) {
      dispatch(removeDisease(diseaseToDelete._id));
      console.log("Deleting Disease:", diseaseToDelete);
      // Close the dialog after deletion
      setDeleteDialogOpen(false);
    }
  };

  //* Column definitions
  // All available columns
  const allColumns = useMemo(
    () => [
      { key: "name", label: "Name", sortable: true },
      { key: "diseaseCategoryName", label: "Category", sortable: true },
      { key: "description", label: "Description", sortable: true },
      { key: "rank", label: "Rank", sortable: true },
      { key: "createdAt", label: "Created At", sortable: true, type: "date" },
      { key: "updatedAt", label: "Updated At", sortable: true, type: "date" },
    ],
    []
  );

  // State for selected columns
  const [selectedColumnKeys, setSelectedColumnKeys] = useState([
    "name",
    "diseaseCategoryName",
    "rank",
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
        <h1 className="text-2xl font-bold">Diseases</h1>
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

      {/* Confirmation dialog */}
      <ConfirmationDialog
        isOpen={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Disease"
        message={`Are you sure you want to delete the disease " ${
          diseaseToDelete?.name || "this disease"
        }?`}
        confirmText="Delete"
        cancelText="Cancel"
        confirmButtonClass="bg-red-600 hover:bg-red-700"
      />
    </div>
  );
}
