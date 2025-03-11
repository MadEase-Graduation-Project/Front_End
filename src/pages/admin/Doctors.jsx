import DataTable from "@/components/AdminComps/DataTable";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllDoctors } from "@/store/Slices/Doctors";

export default function Doctors() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.doctors);

  console.log(items);

  useEffect(() => {
    console.log("the doctors data ya wald ...........<<");
    dispatch(fetchAllDoctors(localStorage.getItem("token")));
  }, [dispatch]);

  return (
    <div>
      <div>I am Doctors page ya wald ................ </div>
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
