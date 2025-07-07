"use client";

import { useState, useMemo } from "react";
import {
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Search,
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

/**
 * Flexible DataTable component
 * @param {Object} props - Component props
 * @param {Array} props.columns - Array of column definitions with { key, label, sortable, render, className }
 * @param {Array} props.data - Array of data objects
 * @param {boolean} props.loading - Loading state
 * @param {boolean} props.selectable - Whether rows can be selected
 * @param {Function} props.onRowClick - Function to call when a row is clicked
 * @param {Function} props.onEdit - Function to call when edit button is clicked
 * @param {Function} props.onDelete - Function to call when delete button is clicked
 * @param {boolean} props.showActions - Whether to show action buttons
 * @param {number} props.pageSize - Number of items per page
 */
export default function ViewTable({
  columns = [],
  data = [],
  loading = false,
  selectable = false,
  onEdit,
  onDelete,
  showActions = false,
  pageSize = 10,
}) {
  // State for sorting
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "asc",
  });

  // State for selected rows
  const [selectedRows, setSelectedRows] = useState([]);

  // State for search
  const [searchTerm, setSearchTerm] = useState("");

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);

  // Handle sort
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Handle row selection
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

  // Filter and sort data
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

    // Apply sorting
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        if (aValue === bValue) return 0;
        if (aValue === null || aValue === undefined) return 1;
        if (bValue === null || bValue === undefined) return -1;

        const comparison =
          typeof aValue === "string"
            ? aValue.localeCompare(bValue)
            : aValue - bValue;

        return sortConfig.direction === "asc" ? comparison : -comparison;
      });
    }

    return filtered;
  }, [data, searchTerm, sortConfig]);

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
      <div className="rounded-lg border bg-card px-2">
        <div className="flex items-center justify-between p-4 border-b">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-9 w-64" />
        </div>
        <div className="overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                {selectable && (
                  <TableHead className="w-12">
                    <Skeleton className="h-4 w-4" />
                  </TableHead>
                )}
                {columns.map((_, index) => (
                  <TableHead key={index}>
                    <Skeleton className="h-4 w-24" />
                  </TableHead>
                ))}
                {showActions && (
                  <TableHead>
                    <Skeleton className="h-4 w-20" />
                  </TableHead>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array(10)
                .fill(0)
                .map((_, index) => (
                  <TableRow key={index}>
                    {selectable && (
                      <TableCell>
                        <Skeleton className="h-4 w-4" />
                      </TableCell>
                    )}
                    {columns.map((_, colIndex) => (
                      <TableCell key={colIndex}>
                        <Skeleton className="h-4 w-full" />
                      </TableCell>
                    ))}
                    {showActions && (
                      <TableCell>
                        <div className="flex space-x-2">
                          <Skeleton className="h-6 w-6" />
                          <Skeleton className="h-6 w-6" />
                        </div>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }

  // Empty state
  if (!loading && (!data || data.length === 0)) {
    return (
      <div className="rounded-lg border bg-card px-2">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Data Table</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search..."
              className="pl-9 w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center justify-center p-12">
          <div className="text-center">
            <p className="text-muted-foreground text-lg">No data available</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border bg-card px-2">
      {/* Table header with search */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-2">
          <h2 className="text-lg font-semibold">
            {selectedRows.length > 0
              ? `${selectedRows.length} selected`
              : `${filteredData.length} items`}
          </h2>
          {selectedRows.length > 0 && (
            <Badge variant="secondary" className="ml-2">
              {selectedRows.length}
            </Badge>
          )}
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search..."
            className="pl-9 w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {selectable && (
                <TableHead className="w-12">
                  <Checkbox
                    checked={
                      selectedRows.length === filteredData.length &&
                      filteredData.length > 0
                    }
                    onCheckedChange={handleSelectAll}
                    aria-label="Select all rows"
                  />
                </TableHead>
              )}
              {columns.map((column) => (
                <TableHead key={column.key} className={column.className || ""}>
                  <div className="flex items-center space-x-2">
                    <span>{column.label}</span>
                    {column.sortable && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0"
                        onClick={() => handleSort(column.key)}
                      >
                        {sortConfig.key === column.key ? (
                          sortConfig.direction === "asc" ? (
                            <ArrowUp className="h-3 w-3" />
                          ) : (
                            <ArrowDown className="h-3 w-3" />
                          )
                        ) : (
                          <ArrowUpDown className="h-3 w-3" />
                        )}
                        <span className="sr-only">Sort by {column.label}</span>
                      </Button>
                    )}
                  </div>
                </TableHead>
              ))}
              {showActions && (
                <TableHead className="text-center">Actions</TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* Render actual data rows */}
            {paginatedData.map((item, rowIndex) => (
              <TableRow
                key={item._id || item.id || rowIndex}
                className={` ${
                  selectedRows.includes(item._id || item.id)
                    ? "bg-muted/50"
                    : ""
                }`}
              >
                {selectable && (
                  <TableCell>
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
                      aria-label={`Select row ${rowIndex + 1}`}
                    />
                  </TableCell>
                )}
                {columns.map((column) => (
                  <TableCell
                    key={column.key}
                    className={column.cellClassName || ""}
                  >
                    {column.render
                      ? column.render(item[column.key], item)
                      : renderCellContent(item[column.key], column.type)}
                  </TableCell>
                ))}
                {showActions && (
                  <TableCell className="text-center">
                    <div className="flex justify-center space-x-2">
                      {onEdit && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={(e) => {
                            e.stopPropagation();
                            onEdit(item);
                          }}
                        >
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                      )}
                      {onDelete && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                          onClick={(e) => {
                            e.stopPropagation();
                            onDelete(item);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      )}
                    </div>
                  </TableCell>
                )}
              </TableRow>
            ))}

            {/* Render empty placeholder rows to maintain consistent height */}
            {Array(Math.max(0, pageSize - paginatedData.length))
              .fill(0)
              .map((_, index) => (
                <TableRow key={`empty-${index}`} className="h-[57px]">
                  {selectable && (
                    <TableCell>
                      <div className="h-4 w-4" />
                    </TableCell>
                  )}
                  {columns.map((column) => (
                    <TableCell
                      key={column.key}
                      className={column.cellClassName || ""}
                    >
                      <div className="h-5" />
                    </TableCell>
                  ))}
                  {showActions && (
                    <TableCell className="text-right">
                      <div className="h-8" />
                    </TableCell>
                  )}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-4 py-3 border-t">
          <div className="flex items-center space-x-2">
            <p className="text-sm text-muted-foreground">
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
              <span className="sr-only">First page</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous page</span>
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
              <span className="sr-only">Next page</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
            >
              <ChevronsRight className="h-4 w-4" />
              <span className="sr-only">Last page</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

// Helper function to render cell content based on type
function renderCellContent(value, type) {
  if (value === undefined || value === null) {
    return <span className="text-muted-foreground">-</span>;
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

// Helper function to get status variant for Badge
function getStatusVariant(status) {
  const statusLower = typeof status === "string" ? status.toLowerCase() : "";

  if (
    statusLower.includes("active") ||
    statusLower.includes("approved") ||
    statusLower === "completed"
  ) {
    return "default"; // Green-ish
  } else if (
    statusLower.includes("pending") ||
    statusLower.includes("in progress")
  ) {
    return "secondary"; // Yellow-ish
  } else if (
    statusLower.includes("inactive") ||
    statusLower.includes("rejected") ||
    statusLower === "failed"
  ) {
    return "destructive"; // Red-ish
  } else {
    return "outline"; // Gray
  }
}

// Helper function to format date
function formatDate(dateString) {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return date.toLocaleDateString();
  } catch (_) {
    return dateString;
  }
}

"use client";

import { useState, useMemo } from "react";
import {
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Search,
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

/**
 * Flexible DataTable component
 * @param {Object} props - Component props
 * @param {Array} props.columns - Array of column definitions with { key, label, sortable, render, className }
 * @param {Array} props.data - Array of data objects
 * @param {boolean} props.loading - Loading state
 * @param {boolean} props.selectable - Whether rows can be selected
 * @param {Function} props.onRowClick - Function to call when a row is clicked
 * @param {Function} props.onEdit - Function to call when edit button is clicked
 * @param {Function} props.onDelete - Function to call when delete button is clicked
 * @param {boolean} props.showActions - Whether to show action buttons
 * @param {number} props.pageSize - Number of items per page
 */
export default function ViewTable({
  columns = [],
  data = [],
  loading = false,
  selectable = false,
  onEdit,
  onDelete,
  showActions = false,
  pageSize = 10,
}) {
  // State for sorting
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "asc",
  });

  // State for selected rows
  const [selectedRows, setSelectedRows] = useState([]);

  // State for search
  const [searchTerm, setSearchTerm] = useState("");

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);

  // Handle sort
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Handle row selection
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

  // Filter and sort data
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

    // Apply sorting
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        if (aValue === bValue) return 0;
        if (aValue === null || aValue === undefined) return 1;
        if (bValue === null || bValue === undefined) return -1;

        const comparison =
          typeof aValue === "string"
            ? aValue.localeCompare(bValue)
            : aValue - bValue;

        return sortConfig.direction === "asc" ? comparison : -comparison;
      });
    }

    return filtered;
  }, [data, searchTerm, sortConfig]);

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
      <div className="rounded-lg border bg-card px-2">
        <div className="flex items-center justify-between p-4 border-b">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-9 w-64" />
        </div>
        <div className="overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                {selectable && (
                  <TableHead className="w-12">
                    <Skeleton className="h-4 w-4" />
                  </TableHead>
                )}
                {columns.map((_, index) => (
                  <TableHead key={index}>
                    <Skeleton className="h-4 w-24" />
                  </TableHead>
                ))}
                {showActions && (
                  <TableHead>
                    <Skeleton className="h-4 w-20" />
                  </TableHead>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array(10)
                .fill(0)
                .map((_, index) => (
                  <TableRow key={index}>
                    {selectable && (
                      <TableCell>
                        <Skeleton className="h-4 w-4" />
                      </TableCell>
                    )}
                    {columns.map((_, colIndex) => (
                      <TableCell key={colIndex}>
                        <Skeleton className="h-4 w-full" />
                      </TableCell>
                    ))}
                    {showActions && (
                      <TableCell>
                        <div className="flex space-x-2">
                          <Skeleton className="h-6 w-6" />
                          <Skeleton className="h-6 w-6" />
                        </div>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }

  // Empty state
  if (!loading && (!data || data.length === 0)) {
    return (
      <div className="rounded-lg border bg-card px-2">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Data Table</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search..."
              className="pl-9 w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center justify-center p-12">
          <div className="text-center">
            <p className="text-muted-foreground text-lg">No data available</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border bg-card px-2">
      {/* Table header with search */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-2">
          <h2 className="text-lg font-semibold">
            {selectedRows.length > 0
              ? `${selectedRows.length} selected`
              : `${filteredData.length} items`}
          </h2>
          {selectedRows.length > 0 && (
            <Badge variant="secondary" className="ml-2">
              {selectedRows.length}
            </Badge>
          )}
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search..."
            className="pl-9 w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {selectable && (
                <TableHead className="w-12">
                  <Checkbox
                    checked={
                      selectedRows.length === filteredData.length &&
                      filteredData.length > 0
                    }
                    onCheckedChange={handleSelectAll}
                    aria-label="Select all rows"
                  />
                </TableHead>
              )}
              {columns.map((column) => (
                <TableHead key={column.key} className={column.className || ""}>
                  <div className="flex items-center space-x-2">
                    <span>{column.label}</span>
                    {column.sortable && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0"
                        onClick={() => handleSort(column.key)}
                      >
                        {sortConfig.key === column.key ? (
                          sortConfig.direction === "asc" ? (
                            <ArrowUp className="h-3 w-3" />
                          ) : (
                            <ArrowDown className="h-3 w-3" />
                          )
                        ) : (
                          <ArrowUpDown className="h-3 w-3" />
                        )}
                        <span className="sr-only">Sort by {column.label}</span>
                      </Button>
                    )}
                  </div>
                </TableHead>
              ))}
              {showActions && (
                <TableHead className="text-center">Actions</TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* Render actual data rows */}
            {paginatedData.map((item, rowIndex) => (
              <TableRow
                key={item._id || item.id || rowIndex}
                className={` ${
                  selectedRows.includes(item._id || item.id)
                    ? "bg-muted/50"
                    : ""
                }`}
              >
                {selectable && (
                  <TableCell>
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
                      aria-label={`Select row ${rowIndex + 1}`}
                    />
                  </TableCell>
                )}
                {columns.map((column) => (
                  <TableCell
                    key={column.key}
                    className={column.cellClassName || ""}
                  >
                    {column.render
                      ? column.render(item[column.key], item)
                      : renderCellContent(item[column.key], column.type)}
                  </TableCell>
                ))}
                {showActions && (
                  <TableCell className="text-center">
                    <div className="flex justify-center space-x-2">
                      {onEdit && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={(e) => {
                            e.stopPropagation();
                            onEdit(item);
                          }}
                        >
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                      )}
                      {onDelete && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                          onClick={(e) => {
                            e.stopPropagation();
                            onDelete(item);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      )}
                    </div>
                  </TableCell>
                )}
              </TableRow>
            ))}

            {/* Render empty placeholder rows to maintain consistent height */}
            {Array(Math.max(0, pageSize - paginatedData.length))
              .fill(0)
              .map((_, index) => (
                <TableRow key={`empty-${index}`} className="h-[57px]">
                  {selectable && (
                    <TableCell>
                      <div className="h-4 w-4" />
                    </TableCell>
                  )}
                  {columns.map((column) => (
                    <TableCell
                      key={column.key}
                      className={column.cellClassName || ""}
                    >
                      <div className="h-5" />
                    </TableCell>
                  ))}
                  {showActions && (
                    <TableCell className="text-right">
                      <div className="h-8" />
                    </TableCell>
                  )}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-4 py-3 border-t">
          <div className="flex items-center space-x-2">
            <p className="text-sm text-muted-foreground">
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
              <span className="sr-only">First page</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous page</span>
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
              <span className="sr-only">Next page</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
            >
              <ChevronsRight className="h-4 w-4" />
              <span className="sr-only">Last page</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

// Helper function to render cell content based on type
function renderCellContent(value, type) {
  if (value === undefined || value === null) {
    return <span className="text-muted-foreground">-</span>;
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

// Helper function to get status variant for Badge
function getStatusVariant(status) {
  const statusLower = typeof status === "string" ? status.toLowerCase() : "";

  if (
    statusLower.includes("active") ||
    statusLower.includes("approved") ||
    statusLower === "completed"
  ) {
    return "default"; // Green-ish
  } else if (
    statusLower.includes("pending") ||
    statusLower.includes("in progress")
  ) {
    return "secondary"; // Yellow-ish
  } else if (
    statusLower.includes("inactive") ||
    statusLower.includes("rejected") ||
    statusLower === "failed"
  ) {
    return "destructive"; // Red-ish
  } else {
    return "outline"; // Gray
  }
}

// Helper function to format date
function formatDate(dateString) {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return date.toLocaleDateString();
  } catch (_) {
    return dateString;
  }
}
