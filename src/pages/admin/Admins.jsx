import DataTable from "@/components/AdminComps/DataTable";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllAdmins } from "@/store/Slices/Admins";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2JmMDI1YTMyNWIzYWFhYzlkZDYzZDMiLCJuYW1lIjoia2FoIiwicm9sZSI6ImRvY3RvciIsImlhdCI6MTc0MTI0Mjk2NiwiZXhwIjoxNzQxMjU3MzY2fQ.2YxYcHRR0yuMsmgh3l0rH42xd7maC-oNR2vh0xdphoI";

export default function Admins() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.admins);

  console.log(items);

  useEffect(() => {
    console.log("fetching admins data...");
    dispatch(fetchAllAdmins(token));
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
