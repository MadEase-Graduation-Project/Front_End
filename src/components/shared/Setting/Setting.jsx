import ProfileInfo from "@/components/shared/Setting/components/ProfileInfo";
import Security from "@/components/shared/Setting/components/Security";
import Navigate from "@/components/ui/Navigate";
import Appearance from "./components/Appearance";

export default function SharedSetting({ details, loading }) {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold">Settings</h1>
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
}
