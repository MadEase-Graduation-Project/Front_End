import DataTable from "@/components/role/admin/DataTable";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllAdmins } from "@/store/slices/adminSlice";
import {
  selectAdminsError,
  selectAdminsLoading,
  selectAllAdmins,
} from "@/store/selectors";
import { isEmpty } from "@/utils/objectUtils";
import FilterColumns from "@/components/role/admin/FilterColumns";
import { Settings } from "lucide-react";

export default function AdminsPage() {
  const dispatch = useDispatch();

  // State for column selector dialog
  const [showColumnSelector, setShowColumnSelector] = useState(false);

  const data = useSelector(selectAllAdmins);
  const loading = useSelector(selectAdminsLoading);
  const error = useSelector(selectAdminsError);

  useEffect(() => {
    if (isEmpty(data)) dispatch(fetchAllAdmins());
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

  const allColumns = [
    { key: "name", label: "Name", sortable: true },
    { key: "email", label: "Email", sortable: true },
    { key: "city", label: "City", sortable: true },
    { key: "phone", label: "Phone", sortable: true },
  ];

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

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Admins</h1>
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
        columns={allColumns}
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
