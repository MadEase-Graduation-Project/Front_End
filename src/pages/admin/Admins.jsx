import DataTable from "@/components/AdminComps/DataTable";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllAdmins } from "@/store/Slices/Admins";

export default function Admins() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.admins);

  console.log(items);

  useEffect(() => {
    console.log("fetching admins data...");
    dispatch(fetchAllAdmins(localStorage.getItem("token")));
  }, [dispatch]);

  return (
    <div>
      <div>Admins Management</div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {items && (
        <DataTable
          columns={["name", "email", "city", "phone"]}
          data={items}
          propertyMap={{
            name: "name",
            email: "email",
            city: "city",
            phone: "phone",
          }}
        />
      )}
    </div>
  );
}
