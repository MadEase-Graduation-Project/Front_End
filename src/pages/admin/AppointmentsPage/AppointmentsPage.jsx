import {
  fetchAppointments,
  removeUserAppointment,
} from "@/store/slices/appointmentSlice";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Settings,
  Grid3X3,
  Table,
  Filter,
  Calendar,
  BarChart3,
} from "lucide-react";
import FilterColumns from "@/components/role/admin/FilterColumns";
import {
  selectAllAppointments,
  selectAppointmentsError,
  selectAppointmentsLoading,
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

export default function AppointmentsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const data = useSelector(selectAllAppointments);
  const loading = useSelector(selectAppointmentsLoading);
  const error = useSelector(selectAppointmentsError);

  // View mode state (table or cards)
  const [viewMode, setViewMode] = useState("table");

  // State for dialogs
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  // states for data
  const [appointment, setAppointment] = useState({ id: "", patientName: "" });

  useEffect(() => {
    if (isEmpty(data)) dispatch(fetchAppointments());
  }, [dispatch]);

  const handleRowClick = (item) => {
    navigate(`/admin/appointment/${item._id}`);
  };

  const handleEdit = (item) => {
    navigate(`/admin/appointment/${item._id}`);
  };

  const handleDelete = (item) => {
    setAppointment({ id: item._id, patientName: item.patientName });
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    dispatch(removeUserAppointment(appointment.id));
    setOpenDeleteDialog(false);
  };

  //* Column definitions
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
    "priority",
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
  const totalAppointments = data?.length || 0;
  const todayAppointments =
    data?.filter((appointment) => {
      const appointmentDate = new Date(appointment.appointmentDate);
      const today = new Date();
      return appointmentDate.toDateString() === today.toDateString();
    })?.length || 0;

  return (
    <div className="p-6 space-y-6">
      {/* Enhanced Header */}
      <div className="space-y-4">
        {/* Title and Stats Row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-gray-900">
              Appointments Management
            </h1>
            <p className="text-sm text-gray-500">
              Manage patient appointments and scheduling across all healthcare
              providers
            </p>
          </div>

          {/* Quick Stats */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 rounded-lg">
              <BarChart3 className="h-4 w-4 text-blue-600" />
              <div className="text-sm">
                <span className="font-semibold text-blue-900">
                  {totalAppointments}
                </span>
                <span className="text-blue-600 ml-1">Total</span>
              </div>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 bg-orange-50 rounded-lg">
              <Calendar className="h-4 w-4 text-orange-600" />
              <div className="text-sm">
                <span className="font-semibold text-orange-900">
                  {todayAppointments}
                </span>
                <span className="text-orange-600 ml-1">Today</span>
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

      <DeleteConfirmationDialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        description={`Are you sure you want to delete this appointment for ${appointment.patientName}?`}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
