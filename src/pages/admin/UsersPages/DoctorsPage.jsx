import DataTable from "@/components/role/admin/DataTable";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllDoctors } from "@/store/slices/doctorSlice";
import FilterColumns from "@/components/role/admin/FilterColumns";
import {
  Settings,
  Grid3X3,
  Table,
  Filter,
  UserCheck,
  BarChart3,
} from "lucide-react";
import {
  selectAllDoctors,
  selectDoctorsError,
  selectDoctorsLoading,
} from "@/store/selectors";
import { isEmpty } from "@/utils/objectUtils";
import ViewTable from "@/components/role/admin/ViewTable";
import ViewCards from "@/components/role/admin/ViewCards";
import { DeleteConfirmationDialog } from "@/components/role/admin/DeleteConfirm";
import { removeUser } from "@/store/slices/userSlice";
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

export default function DoctorsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // View mode state (table or cards)
  const [viewMode, setViewMode] = useState("table");

  // states for data
  const [doctor, setDoctor] = useState({ id: "", name: "" });

  // states for dialogs
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  // selectors
  const data = useSelector(selectAllDoctors);
  const loading = useSelector(selectDoctorsLoading);
  const error = useSelector(selectDoctorsError);

  useEffect(() => {
    if (isEmpty(data)) dispatch(fetchAllDoctors());
  }, [dispatch]);

  const handleEdit = (item) => {
    navigate(`/admin/profile/${item._id}`);
  };

  const handleDelete = (item) => {
    setDoctor({ id: item._id, name: item.name });
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    dispatch(removeUser(doctor.id));
    setOpenDeleteDialog(false);
  };

  //* Column definitions
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
    "isVerified",
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
  const totalDoctors = data?.length || 0;
  const verifiedDoctors =
    data?.filter((doctor) => doctor.isVerified)?.length || 0;

  return (
    <div className="p-6 space-y-6">
      {/* Enhanced Header */}
      <div className="space-y-4">
        {/* Title and Stats Row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-gray-900">
              Doctors Management
            </h1>
            <p className="text-sm text-gray-500">
              Manage healthcare professionals and their account information
            </p>
          </div>

          {/* Quick Stats */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 rounded-lg">
              <BarChart3 className="h-4 w-4 text-blue-600" />
              <div className="text-sm">
                <span className="font-semibold text-blue-900">
                  {totalDoctors}
                </span>
                <span className="text-blue-600 ml-1">Total</span>
              </div>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 bg-emerald-50 rounded-lg">
              <UserCheck className="h-4 w-4 text-emerald-600" />
              <div className="text-sm">
                <span className="font-semibold text-emerald-900">
                  {verifiedDoctors}
                </span>
                <span className="text-emerald-600 ml-1">Verified</span>
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
          pageSize={5}
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
          pageSize={6}
        />
      )}

      <DeleteConfirmationDialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        description={`Are you sure you want to delete Dr. ${doctor.name}'s account?`}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
