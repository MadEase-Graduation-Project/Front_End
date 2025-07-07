import { useEffect } from "react";
import { fetchMYData } from "@/store/slices/userSlice";
import { selectMyDetails, selectUsersLoading } from "@/store/selectors";
import { useDispatch, useSelector } from "react-redux";
import Navigate from "@/components/ui/Navigate";
import ProfileInfo from "@/components/shared/Setting/ProfileInfo";
import Security from "@/components/shared/Setting/Security";
import Appearance from "@/components/shared/Setting/Appearance";

// Settingssss

export const NurseSetting = () => {
  const dispatch = useDispatch();
  const details = useSelector(selectMyDetails);
  const loading = useSelector(selectUsersLoading);

  useEffect(() => {
    dispatch(fetchMYData());
  }, [dispatch]);

  return (
    <div className="px-2 sm:px-4">
      <Navigate
        tabs={[
          {
            label: "Profile Info",
            content: <ProfileInfo details={details} loading={loading} />,
          },
          { label: "Security", content: <Security details={details} /> },
          { label: "Appearance", content: <Appearance /> },
        ]}
      />
    </div>
    );
};
