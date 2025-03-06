import { useState } from "react";

export default function DataTable({ columns, data, propertyMap }) {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 6;

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);

  const pageCount = Math.ceil(data.length / rowsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page + 1);
  };
  return (
    <div className="flex flex-col items-center border bg-gray-50 rounded-lg truncate">
      <table className="min-w-full divide-y divide-gray-200">
        {/* header */}
        <thead>
          <tr>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
              </div>
            </th>
            {columns.map((column) => (
              <th
                key={column}
                className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        {/* ------------------------------------------------------ */}
        {/* body */}
        <tbody className="bg-white divide-y divide-gray-200">
          {currentRows.map((item) => (
            <tr key={item._id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded-full text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                </div>
              </td>
              {columns.map((column) => (
                <td key={column} className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {item[propertyMap[column]]}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-center items-center my-2">
        {Array.from({ length: pageCount }, (_, index) => (
          <button
            key={index}
            className={`p-1 mx-1 text-sm rounded ${
              currentPage === index + 1 ? "bg-blue-500 text-white" : ""
            }`}
            onClick={() => handlePageChange(index)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
