export default function Appointments() {
  return (
    <div>
      <div>I am Appointments page ya wald</div>
    </div>
  );
}

// import DataTable from "@/components/AdminComps/DataTable";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchAllAppointments } from "@/store/Slices/Appointments";

// const token =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2JmMDI1YTMyNWIzYWFhYzlkZDYzZDMiLCJuYW1lIjoia2FoIiwicm9sZSI6ImRvY3RvciIsImlhdCI6MTc0MTIzMzE1NiwiZXhwIjoxNzQxMjQ3NTU2fQ.sVd7fZf4yk7XGGDZVC9O9cFSGsCYL9k_TsQFWqRbMPk";

// export default function Appointments() {
//   const dispatch = useDispatch();
//   const { items, loading, error } = useSelector((state) => state.appointments);

//   console.log(items);

//   useEffect(() => {
//     console.log("the appointments data ya wald ...........<<");
//     dispatch(fetchAllAppointments(token));
//   }, [dispatch]);

//   return (
//     <div>
//       <div>I am Appointments page ya wald</div>
//       {loading && <p>Loading...</p>}
//       {error && <p>Error: {error}</p>}
//       {items && (
//         <DataTable
//           columns={["name", "description", "rank"]}
//           data={items}
//           propertyMap={{
//             name: "name",
//             description: "description",
//             rank: "rank",
//           }}
//         />
//       )}
//     </div>
//   );
// }
