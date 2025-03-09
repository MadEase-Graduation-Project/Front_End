import DataTable from "@/components/AdminComps/DataTable";
import { fetchAllDiseases } from "@/store/Slices/Diseases";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2JmMDI1YTMyNWIzYWFhYzlkZDYzZDMiLCJuYW1lIjoia2FoIiwicm9sZSI6ImRvY3RvciIsImlhdCI6MTc0MTQzNjM1NCwiZXhwIjoxNzQxNDUwNzU0fQ.ZqWC4xKdqaW2JICcS8O-GtN6hZSV81HOmyhm73s_EGo";

export default function Diseases() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.diseases);

  console.log(items);

  useEffect(() => {
    console.log("the diseases data ya wald ...........<<");
    dispatch(fetchAllDiseases(token));
  }, [dispatch]);
  //
  //
  //
  //
  //
  //
  return (
    <div>
      <div>ana el diseases page ya wald</div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {items && (
        <DataTable
          columns={["name", "description", "rank"]}
          data={items}
          propertyMap={{
            name: "name",
            description: "description",
            rank: "rank",
          }}
        />
      )}
    </div>
  );
}
