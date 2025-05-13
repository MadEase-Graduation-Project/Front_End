import DataTable from "@/components/adminComps/DataTable";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllAdmins } from "@/store/slices/adminSlice";

export default function Admins() {
  const dispatch = useDispatch();
  const { items: data, loading } = useSelector((state) => state.admins);

  useEffect(() => {
    dispatch(fetchAllAdmins());
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

  const columns = [
    { key: "name", label: "Name", sortable: true },
    { key: "email", label: "Email", sortable: true },
    { key: "city", label: "City", sortable: true },
    { key: "phone", label: "Phone", sortable: true },
  ];

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Admins</h1>
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
        pageSize={5}
      />
    </div>
  );
}
