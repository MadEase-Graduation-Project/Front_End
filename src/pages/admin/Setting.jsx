import ProfileInfo from "@/components/adminComps/ProfileInfo";
import Security from "@/components/adminComps/Security";
import Navigate from "@/components/adminComps/tinyComps/Navigate";
import { fetchUserData } from "@/store/slices/userSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Setting() {
  const dispatch = useDispatch();

  const { details, loading } = useSelector((state) => state.users);

  useEffect(() => {
    if (Object.keys(details).length === 0) dispatch(fetchUserData());
  }, [dispatch]);
  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold">Settings</h1>
      <Navigate
        tabs={[
          {
            label: "Profile Info",
            content: <ProfileInfo details={details} loading={loading} />,
          },
          { label: "Security", content: <Security /> },
          { label: "Appearance", content: <div>Appearance Content</div> },
        ]}
      />
    </div>
  );
}
