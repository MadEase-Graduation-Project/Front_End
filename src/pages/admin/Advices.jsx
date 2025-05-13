import DataTable from "@/components/adminComps/DataTable";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllAdvices } from "@/store/slices/adviceSlice";

export default function Advices() {
  // const dispatch = useDispatch();
  // const { items, loading } = useSelector((state) => state.advices);

  // useEffect(() => {
  //   console.log("the advices data ya wald ...........<<");
  //   dispatch(fetchAllAdvices());
  // }, [dispatch]);

  return (
    <div>
      <div>I am Advices page ya wald ................ </div>
    </div>
  );
}
