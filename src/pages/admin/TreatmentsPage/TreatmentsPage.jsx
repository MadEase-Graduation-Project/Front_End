import DataTable from "@/components/role/admin/DataTable";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Settings } from "lucide-react";
import FilterColumns from "@/components/role/admin/FilterColumns";
import {
  selectAllTreatments,
  selectTreatmentsLoading,
  selectTreatmentsError,
} from "@/store/selectors";
import { isEmpty } from "@/utils/objectUtils";
import { fetchAllTreatments } from "@/store/slices/treatmentSlice";

export default function TreatmentsPage() {
  const dispatch = useDispatch();

  const data = useSelector(selectAllTreatments);
  const loading = useSelector(selectTreatmentsLoading);
  const error = useSelector(selectTreatmentsError);

  useEffect(() => {
    if (isEmpty(data)) dispatch(fetchAllTreatments());
  }, [dispatch]);

  const handleRowClick = (item) => {
    console.log("Row clicked:", item);
  };

  const handleEdit = (item) => {
    console.log("Edit item:", item);
  };

  const handleDelete = (item) => {
    console.log("Delete item:", item);
  };

  // All available columns
  const allColumns = useMemo(
    () => [
      { key: "name", label: "Treatment Name", sortable: true },
      { key: "description", label: "Description", sortable: false },
      { key: "refills", label: "Refills", sortable: true },
      { key: "dosage", label: "Dosage", sortable: false },
      { key: "quantity", label: "Quantity", sortable: false },
      { key: "instructions", label: "Instructions", sortable: false },
      { key: "notes", label: "Notes", sortable: false },
      { key: "createdAt", label: "Created At", sortable: true, type: "date" },
      { key: "updatedAt", label: "Updated At", sortable: true, type: "date" },
    ],
    []
  );

  // State for selected columns
  const [selectedColumnKeys, setSelectedColumnKeys] = useState([
    "name",
    "refills",
    "dosage",
    "quantity",
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

  return (
    <div className="p-4">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-2">
        <h1 className="text-2xl font-bold">Treatments</h1>
        <div className="flex gap-2 w-full sm:w-auto">
          <button
            onClick={() => setShowColumnSelector(true)}
            className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-gray-700 transition-colors"
          >
            <Settings size={18} />
            <span>Customize Columns</span>
          </button>
        </div>
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
    </div>
  );
}
