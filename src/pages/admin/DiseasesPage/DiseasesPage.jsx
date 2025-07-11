import { fetchAllDiseases, removeDisease } from "@/store/slices/diseaseSlice";
import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Settings,
  Grid3X3,
  Table,
  Filter,
  Activity,
  BarChart3,
} from "lucide-react";
import FilterColumns from "@/components/role/admin/FilterColumns";
import {
  selectAllDiseases,
  selectDiseasesError,
  selectDiseasesLoading,
} from "@/store/selectors";
import { isEmpty } from "@/utils/objectUtils";
import ViewTable from "@/components/role/admin/ViewTable";
import ViewCards from "@/components/role/admin/ViewCards";
import { DeleteConfirmationDialog } from "@/components/role/admin/DeleteConfirm";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function DiseasesPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const data = useSelector(selectAllDiseases);
  const loading = useSelector(selectDiseasesLoading);
  const error = useSelector(selectDiseasesError);

  // View mode state (table or cards)
  const [viewMode, setViewMode] = useState("table");

  // State for dialogs
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const [disease, setDisease] = useState({ id: "", name: "" });

  useEffect(() => {
    if (isEmpty(data)) dispatch(fetchAllDiseases());
  }, [dispatch]);

  const handleEdit = (item) => {
    navigate(`/admin/disease/${item._id}`);
  };

  const handleDelete = (item) => {
    setDisease({ id: item._id, name: item.name });
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    dispatch(removeDisease(disease.id));
    setOpenDeleteDialog(false);
  };

  //* Column definitions
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

  // Calculate statistics
  const totalDiseases = data?.length || 0;
  const categorizedDiseases =
    data?.filter((disease) => disease.diseaseCategoryName)?.length || 0;

  return (
    <div className="p-6 space-y-6">
      {/* Enhanced Header */}
      <div className="space-y-4">
        {/* Title and Stats Row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-gray-900">
              Diseases Database
            </h1>
            <p className="text-sm text-gray-500">
              Comprehensive medical conditions database with categorization and
              detailed information
            </p>
          </div>

          {/* Quick Stats */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 rounded-lg">
              <BarChart3 className="h-4 w-4 text-blue-600" />
              <div className="text-sm">
                <span className="font-semibold text-blue-900">
                  {totalDiseases}
                </span>
                <span className="text-blue-600 ml-1">Total</span>
              </div>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 bg-purple-50 rounded-lg">
              <Activity className="h-4 w-4 text-purple-600" />
              <div className="text-sm">
                <span className="font-semibold text-purple-900">
                  {categorizedDiseases}
                </span>
                <span className="text-purple-600 ml-1">Categorized</span>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Controls Row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Left side - View Toggle */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">View:</span>
            <div className="flex items-center bg-gray-100 rounded-lg p-1">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={viewMode === "table" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("table")}
                      className="h-8 w-8 p-0"
                    >
                      <Table className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Table View</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={viewMode === "cards" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("cards")}
                      className="h-8 w-8 p-0"
                    >
                      <Grid3X3 className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Cards View</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          {/* Right side - Actions */}
          <div className="flex items-center gap-3">
            {/* Enhanced Customize Columns Button */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowColumnSelector(true)}
                    className="gap-2 bg-white hover:bg-gray-50 border-gray-200 shadow-sm"
                  >
                    <Settings className="h-4 w-4" />
                    <span className="hidden sm:inline">Customize</span>
                    <Badge variant="outline" className="ml-1 text-xs">
                      {selectedColumnKeys.length}/{allColumns.length}
                    </Badge>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    Customize visible columns ({selectedColumnKeys.length} of{" "}
                    {allColumns.length} selected)
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
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

      {/* Data Display */}
      {viewMode === "table" ? (
        <ViewTable
          columns={columns}
          data={data}
          loading={loading}
          selectable={true}
          showActions={true}
          onEdit={handleEdit}
          onDelete={handleDelete}
          pageSize={10}
        />
      ) : (
        <ViewCards
          columns={columns}
          data={data}
          loading={loading}
          selectable={true}
          showActions={true}
          onEdit={handleEdit}
          onDelete={handleDelete}
          pageSize={9}
        />
      )}

      <DeleteConfirmationDialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        description={`Are you sure you want to delete disease "${disease.name}"?`}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
