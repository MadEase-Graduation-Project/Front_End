import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Settings,
  Grid3X3,
  Table,
  Filter,
  Pill,
  BarChart3,
} from "lucide-react";
import FilterColumns from "@/components/role/admin/FilterColumns";
import {
  selectAllTreatments,
  selectTreatmentsLoading,
  selectTreatmentsError,
} from "@/store/selectors";
import { isEmpty } from "@/utils/objectUtils";
import {
  fetchAllTreatments,
  removeTreatment,
} from "@/store/slices/treatmentSlice";
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

export default function TreatmentsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // View mode state (table or cards)
  const [viewMode, setViewMode] = useState("table");

  // states for data
  const [treatment, setTreatment] = useState({ id: "", name: "" });

  // states dialogs
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  // selectors
  const data = useSelector(selectAllTreatments);
  const loading = useSelector(selectTreatmentsLoading);
  const error = useSelector(selectTreatmentsError);

  useEffect(() => {
    if (isEmpty(data)) dispatch(fetchAllTreatments());
  }, [dispatch]);

  const handleEdit = (item) => {
    navigate(`/admin/treatment/${item._id}`);
  };

  const handleDelete = (item) => {
    setTreatment({ id: item._id, name: item.name });
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    dispatch(removeTreatment(treatment.id));
    setOpenDeleteDialog(false);
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

  // Calculate statistics
  const totalTreatments = data?.length || 0;
  const refillableTreatments =
    data?.filter((treatment) => treatment.refills > 0)?.length || 0;

  return (
    <div className="p-6 space-y-6">
      {/* Enhanced Header */}
      <div className="space-y-4">
        {/* Title and Stats Row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-gray-900">
              Treatments Management
            </h1>
            <p className="text-sm text-gray-500">
              Manage medical treatments, prescriptions, and medication protocols
            </p>
          </div>

          {/* Quick Stats */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 rounded-lg">
              <BarChart3 className="h-4 w-4 text-blue-600" />
              <div className="text-sm">
                <span className="font-semibold text-blue-900">
                  {totalTreatments}
                </span>
                <span className="text-blue-600 ml-1">Total</span>
              </div>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 bg-green-50 rounded-lg">
              <Pill className="h-4 w-4 text-green-600" />
              <div className="text-sm">
                <span className="font-semibold text-green-900">
                  {refillableTreatments}
                </span>
                <span className="text-green-600 ml-1">Refillable</span>
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
            {/* Status Filter */}
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="h-4 w-4" />
              Filter
              <Badge variant="secondary" className="ml-1">
                All
              </Badge>
            </Button>

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
