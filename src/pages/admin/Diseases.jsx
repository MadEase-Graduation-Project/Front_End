import DataTable from "@/components/AdminComps/DataTable";
import { fetchAllDiseases } from "@/store/Slices/Diseases";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Diseases() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.diseases);

  console.log(items);

  useEffect(() => {
    console.log("the diseases data ya wald ...........<<");
    dispatch(fetchAllDiseases(localStorage.getItem("token")));
  }, [dispatch]);
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