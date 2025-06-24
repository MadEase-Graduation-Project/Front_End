import { useState } from "react";
import DataTable from "@/components/role/admin/DataTable";

export default function DataTableExample() {
  const [loading, setLoading] = useState(false);

  // Example data
  const data = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      status: "Active",
      role: "Admin",
      createdAt: "2023-01-15T12:00:00Z",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      status: "Inactive",
      role: "User",
      createdAt: "2023-02-20T14:30:00Z",
    },
    {
      id: 3,
      name: "Bob Johnson",
      email: "bob@example.com",
      status: "Pending",
      role: "Editor",
      createdAt: "2023-03-10T09:15:00Z",
    },
    // Add more data as needed
  ];

  // Column definitions
  const columns = [
    {
      key: "name",
      label: "Name",
      sortable: true,
    },
    {
      key: "email",
      label: "Email",
      sortable: true,
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      type: "status", // This will apply special styling based on status value
    },
    {
      key: "role",
      label: "Role",
      sortable: true,
    },
    {
      key: "createdAt",
      label: "Created At",
      sortable: true,
      type: "date", // This will format the date
      // Custom render function example
      render: (value) => {
        const date = new Date(value);
        return date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        });
      },
    },
  ];

  // Example handlers
  const handleRowClick = (item) => {
    console.log("Row clicked:", item);
  };

  const handleEdit = (item) => {
    console.log("Edit item:", item);
  };

  const handleDelete = (item) => {
    console.log("Delete item:", item);
  };

  // Toggle loading state for demonstration
  const toggleLoading = () => {
    setLoading((prev) => !prev);
  };

  return (
    <div className="p-4">
      <div className="mb-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Data Table Example</h1>
        <button
          onClick={toggleLoading}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {loading ? "Show Data" : "Show Loading State"}
        </button>
      </div>

      <DataTable
        columns={columns}
        data={data}
        loading={loading}
        selectable={true}
        showActions={true}
        onRowClick={handleRowClick}
        onEdit={handleEdit}
        onDelete={handleDelete}
        pageSize={2} // Small page size to demonstrate pagination
      />
    </div>
  );
}
