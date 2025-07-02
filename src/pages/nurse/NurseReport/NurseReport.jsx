import FilterDropdown from "@/components/ui/FilterDropdown";
import SearchInput from "@/components/ui/SearchInput";

const reportsData = [
  {
    id: 1,
    title: "Patient Report",
    date: "2025-06-20",
    summary: "General health status and lab results."
  },
  {
    id: 2,
    title: "Ward Activity",
    date: "2025-06-18",
    summary: "Daily medication and patient monitoring report."
  },
  {
    id: 3,
    title: "Incident Report",
    date: "2025-06-15",
    summary: "Details of patient-related incident during night shift."
  }
];

export default function Reports() {
  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center gap-4 flex-wrap">
        <SearchInput placeholder="Search Reports..." />
        <FilterDropdown label="Filter by Date" options={["Today", "Last Week", "Last Month"]} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {reportsData.map((report) => (
          <div
            key={report.id}
            className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition duration-200"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {report.title}
            </h3>
            <p className="text-sm text-gray-600 mb-1">Date: {report.date}</p>
            <p className="text-sm text-gray-700">{report.summary}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
