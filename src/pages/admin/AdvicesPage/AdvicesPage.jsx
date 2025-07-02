import DataTable from "@/components/role/admin/DataTable";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllAdvices } from "@/store/slices/adviceSlice";
import { Settings } from "lucide-react";
import FilterColumns from "@/components/role/admin/FilterColumns";
import {
  selectAdvicesError,
  selectAdvicesLoading,
  selectAllAdvices,
} from "@/store/selectors";
import { isEmpty } from "@/utils/objectUtils";

export default function AdvicesPage() {
  const dispatch = useDispatch();

  const data = useSelector(selectAllAdvices);
  const loading = useSelector(selectAdvicesLoading);
  const error = useSelector(selectAdvicesError);

  useEffect(() => {
    if (isEmpty(data)) dispatch(fetchAllAdvices());
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

  //* Columns definition
  const allColumns = useMemo(() => [
    { key: "title", label: "Title", sortable: true },
    { key: "doctorName", label: "Doctor Name", sortable: true },
    { key: "diseasesCategoryName", label: "Category", sortable: true },
    { key: "description", label: "Description", sortable: false },
    { key: "createdAt", label: "Created At", sortable: true, type: "date" },
    { key: "updatedAt", label: "Updated At", sortable: true, type: "date" },
  ]);

  // State for selected columns
  const [selectedColumnKeys, setSelectedColumnKeys] = useState([
    "title",
    "doctorName",
    "diseasesCategoryName",
    "createdAt",
  ]);

  // Column selector options for react-select
  const columnOptions = allColumns.map((col) => ({
    value: col.key,
    label: col.label,
  }));

  const [showColumnSelector, setShowColumnSelector] = useState(false);

  // Filtered columns based on selection
  const columns = useMemo(() => {
    return allColumns.filter((col) => selectedColumnKeys.includes(col.key));
  }, [selectedColumnKeys, allColumns]);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Advices</h1>
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
    </div>
  );
}
