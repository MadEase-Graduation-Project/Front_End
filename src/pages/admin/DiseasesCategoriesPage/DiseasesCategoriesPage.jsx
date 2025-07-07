import DataTable from "@/components/role/admin/DataTable";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Settings } from "lucide-react";
import FilterColumns from "@/components/role/admin/FilterColumns";
import {
  selectAllDiseasesCategories,
  selectDiseasesCategoriesError,
  selectDiseasesCategoriesLoading,
} from "@/store/selectors";
import { isEmpty } from "@/utils/objectUtils";
import { fetchAllDiseasesCategories } from "@/store/slices/diseasesCategorySlice";
import ViewTable from "@/components/role/admin/ViewTable";

export default function DiseasesCategoriesPage() {
  const dispatch = useDispatch();

  const data = useSelector(selectAllDiseasesCategories);
  const loading = useSelector(selectDiseasesCategoriesLoading);
  const error = useSelector(selectDiseasesCategoriesError);

  useEffect(() => {
    if (isEmpty(data)) dispatch(fetchAllDiseasesCategories());
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
      { key: "name", label: "Category Name", sortable: true },
      { key: "description", label: "Description", sortable: false },
      { key: "rank", label: "Rank", sortable: true },

      { key: "createdAt", label: "Created At", sortable: true, type: "date" },
      { key: "updatedAt", label: "Updated At", sortable: true, type: "date" },
    ],
    []
  );

  // State for selected columns
  const [selectedColumnKeys, setSelectedColumnKeys] = useState([
    "name",
    "description",
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
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Disease Categories</h1>
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
    </div>
  );
}
