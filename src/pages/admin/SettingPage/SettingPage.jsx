import { fetchMYData } from "@/store/slices/userSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SharedSetting from "@/components/shared/Setting/Setting";

export default function SettingPage() {
  const dispatch = useDispatch();

  const { details, loading } = useSelector((state) => state.users);

  useEffect(() => {
    if (Object.keys(details).length === 0) dispatch(fetchMYData());
  }, [dispatch]);

  return (
    <>
      <SharedSetting details={details} loading={loading} />
    </>
  );
}
