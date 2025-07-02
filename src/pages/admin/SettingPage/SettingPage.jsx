import { useSelector } from "react-redux";
import SharedSetting from "@/components/shared/Setting/Setting";
import { selectMyDetails } from "@/store/selectors";

export default function SettingPage() {
  const details = useSelector(selectMyDetails);
  // todo: add loading section for myDetails only

  return (
    <>
      <SharedSetting details={details} loading={false} />
    </>
  );
}
