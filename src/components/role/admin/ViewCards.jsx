"use client";

import { useState, useMemo } from "react";
import {
  Search,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

/**
 * ViewCards component - displays data in card format
 * @param {Object} props - Component props
 * @param {Array} props.columns - Array of column definitions with { key, label, sortable, render, className }
 * @param {Array} props.data - Array of data objects
 * @param {boolean} props.loading - Loading state
 * @param {boolean} props.selectable - Whether cards can be selected
 * @param {Function} props.onEdit - Function to call when edit button is clicked
 * @param {Function} props.onDelete - Function to call when delete button is clicked
 * @param {boolean} props.showActions - Whether to show action buttons
 * @param {number} props.pageSize - Number of items per page
 */
export default function ViewCards({
  columns = [],
  data = [],
  loading = false,
  selectable = false,
  onEdit,
  onDelete,
  showActions = false,
  pageSize = 10,
}) {
  // State for selected cards
  const [selectedRows, setSelectedRows] = useState([]);

  // State for search
  const [searchTerm, setSearchTerm] = useState("");

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);

  // Handle card selection
  const handleSelectRow = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  // Handle select all
  const handleSelectAll = () => {
    if (selectedRows.length === filteredData.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(filteredData.map((item) => item._id || item.id));
    }
  };

  // Filter data
  const filteredData = useMemo(() => {
    let filtered = [...data];

    // Apply search filter
    if (searchTerm) {
      const lowerCaseSearch = searchTerm.toLowerCase();
      filtered = filtered.filter((item) =>
        Object.values(item).some(
          (value) =>
            value &&
            typeof value === "string" &&
            value.toLowerCase().includes(lowerCaseSearch)
        )
      );
    }

    return filtered;
  }, [data, searchTerm]);

  // Paginate data
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredData.slice(startIndex, startIndex + pageSize);
  }, [filteredData, currentPage, pageSize]);

  // Calculate total pages
  const totalPages = Math.ceil(filteredData.length / pageSize);

  // Reset to first page when search changes
  useMemo(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Loading state
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 flex justify-between items-center border-b">
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-8 w-60" />
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array(6)
              .fill(0)
              .map((_, index) => (
                <Card key={index}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-5 w-32" />
                      {selectable && <Skeleton className="h-4 w-4" />}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    {showActions && (
                      <div className="flex space-x-2 pt-2">
                        <Skeleton className="h-6 w-6" />
                        <Skeleton className="h-6 w-6" />
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </div>
    );
  }

  // Empty state
  if (!loading && (!data || data.length === 0)) {
    return (
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 flex justify-between items-center border-b">
          <h2 className="text-lg font-medium text-gray-900">Data Cards</h2>
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="pl-8 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-3 text-gray-400" />
          </div>
        </div>
        <div className="p-12 text-center">
          <p className="text-gray-500 text-lg">No data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {/* Header with search */}
      <div className="p-4 flex justify-between items-center border-b">
        <div className="flex items-center space-x-4">
          <h2 className="text-lg font-medium text-gray-900">
            {selectedRows.length > 0
              ? `${selectedRows.length} selected`
              : `${filteredData.length} items`}
          </h2>
          {selectable && filteredData.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleSelectAll}
              className="text-sm bg-transparent"
            >
              {selectedRows.length === filteredData.length
                ? "Deselect All"
                : "Select All"}
            </Button>
          )}
        </div>
        <div className="relative">
          <Input
            type="text"
            placeholder="Search..."
            className="pl-9 w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {/* Cards Grid */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {paginatedData.map((item, index) => (
            <Card
              key={item._id || item.id || index}
              className={` ${
                selectedRows.includes(item._id || item.id)
                  ? "ring-2 ring-blue-500 bg-blue-50"
                  : ""
              }`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">
                    {/* Display the first column as title */}
                    {columns.length > 0 &&
                      (columns[0].render
                        ? columns[0].render(item[columns[0].key], item)
                        : renderCellContent(
                            item[columns[0].key],
                            columns[0].type
                          ))}
                  </h3>
                  {selectable && (
                    <Checkbox
                      checked={selectedRows.includes(item._id || item.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          handleSelectRow(item._id || item.id);
                        } else {
                          handleSelectRow(item._id || item.id);
                        }
                      }}
                      onClick={(e) => e.stopPropagation()}
                    />
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                {/* Display remaining columns as content */}
                {columns.slice(1).map((column) => (
                  <div
                    key={column.key}
                    className="flex justify-between items-center"
                  >
                    <span className="text-sm font-medium text-gray-500">
                      {column.label}:
                    </span>
                    <div className="text-sm text-gray-900">
                      {column.render
                        ? column.render(item[column.key], item)
                        : renderCellContent(item[column.key], column.type)}
                    </div>
                  </div>
                ))}

                {/* Actions */}
                {showActions && (
                  <div className="flex space-x-2 pt-3 border-t">
                    {onEdit && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          onEdit(item);
                        }}
                        className="flex-1"
                      >
                        <Eye className="h-4 w-4" />
                        View
                      </Button>
                    )}
                    {onDelete && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDelete(item);
                        }}
                        className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}

          {/* Empty placeholder cards to maintain grid layout */}
          {Array(Math.max(0, pageSize - paginatedData.length))
            .fill(0)
            .map((_, index) => (
              <div key={`empty-${index}`} className="h-0" />
            ))}
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="px-6 py-3 flex items-center justify-between border-t border-gray-200">
          <div className="flex-1 flex justify-between sm:hidden">
            <Button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              variant="outline"
              size="sm"
            >
              Previous
            </Button>
            <Button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              variant="outline"
              size="sm"
            >
              Next
            </Button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing{" "}
                <span className="font-medium">
                  {(currentPage - 1) * pageSize + 1}
                </span>{" "}
                to{" "}
                <span className="font-medium">
                  {Math.min(currentPage * pageSize, filteredData.length)}
                </span>{" "}
                of <span className="font-medium">{filteredData.length}</span>{" "}
                results
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
              >
                <ChevronsLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              {/* Page numbers */}
              <div className="flex items-center space-x-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }

                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(pageNum)}
                      className="w-8 h-8 p-0"
                    >
                      {pageNum}
                    </Button>
                  );
                })}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
              >
                <ChevronsRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Helper function to render cell content based on type (same as original)
function renderCellContent(value, type) {
  if (value === undefined || value === null) {
    return <span className="text-gray-400">-</span>;
  }

  switch (type) {
    case "status":
      return (
        <Badge variant={getStatusVariant(value)} className="font-normal">
          {value}
        </Badge>
      );
    case "date":
      return <span className="text-sm">{formatDate(value)}</span>;
    case "boolean":
      return (
        <Badge variant={value ? "default" : "secondary"}>
          {value ? "Yes" : "No"}
        </Badge>
      );
    case "number":
      return (
        <span className="text-sm font-mono">
          {typeof value === "number" ? value.toLocaleString() : value}
        </span>
      );
    default:
      return <span className="text-sm">{value}</span>;
  }
}

// Helper function to get status variant for Badge (same as original)
function getStatusVariant(status) {
  const statusLower = typeof status === "string" ? status.toLowerCase() : "";

  if (
    statusLower.includes("active") ||
    statusLower.includes("approved") ||
    statusLower === "completed"
  ) {
    return "default";
  } else if (
    statusLower.includes("pending") ||
    statusLower.includes("in progress")
  ) {
    return "secondary";
  } else if (
    statusLower.includes("inactive") ||
    statusLower.includes("rejected") ||
    statusLower === "failed"
  ) {
    return "destructive";
  } else {
    return "outline";
  }
}

// Helper function to format date (same as original)
function formatDate(dateString) {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return date.toLocaleDateString();
  } catch (_) {
    return dateString;
  }
}
