import DataTable from "@/components/AdminComps/DataTable";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPatients } from "@/store/Slices/Patients";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2JmMDI1YTMyNWIzYWFhYzlkZDYzZDMiLCJuYW1lIjoia2FoIiwicm9sZSI6ImRvY3RvciIsImlhdCI6MTc0MTI3MTUwOCwiZXhwIjoxNzQxMjg1OTA4fQ.GFp3K7zavbuFH48dKT_CJhqaNgLXYGp5p0QvM55Mx-Y";

export default function Patients() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.patients);

  console.log(items);

  useEffect(() => {
    console.log("the appointments data ya wald ...........<<");
    dispatch(fetchAllPatients(token));
  }, [dispatch]);

  return (
    <div>
      <div>I am Patients page ya wald ................ </div>
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
