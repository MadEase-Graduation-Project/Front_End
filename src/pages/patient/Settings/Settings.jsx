import Navigate from "@/components/ui/Navigate";
import ProfileInfo from "@/components/shared/Setting/ProfileInfo";
import Security from "@/components/shared/Setting/Security";
import MedHistory from "./MedHistory";
import MyDiagnoses from "./MtDiagnoses/MyDiagnoses";
import MyApps from "./MyApps/MyApps";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMYData } from "@/store/slices/userSlice";
import {
  selectMyDetails,
  selectUsersLoading,
} from "@/store/selectors/userSelectors";
export default function Settings() {
  const dispatch = useDispatch();
  const details = useSelector(selectMyDetails);
  const loading = useSelector(selectUsersLoading);

  useEffect(() => {
    dispatch(fetchMYData());
  }, [dispatch]);
  return (
    <div className="w-full h-full p-4">
      <Navigate
        tabs={[
          {
            label: "Profile Info",
            content: <ProfileInfo details={details} loading={loading} />,
          },
          { label: "Security", content: <Security details={details} /> },

          { label: "Medical history", content: <MedHistory /> },
          { label: "My diagnoses", content: <MyDiagnoses /> },
          { label: "My appointments", content: <MyApps /> },
        ]}
      />
    </div>
  );
}
