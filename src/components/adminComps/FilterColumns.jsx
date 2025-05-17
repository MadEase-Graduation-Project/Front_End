import { X } from "lucide-react";
import Select from "react-select";

export default function FilterColumns({
  isOpen,
  onClose,
  options,
  selected,
  onSelectedChange,
  allColumns,
}) {
  return (
    <div className="">
      {/* Column Selector Dialog */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => onClose(false)}
          ></div>

          {/* Dialog */}
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4 z-10 overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-semibold">Customize Table Columns</h2>
              <button
                onClick={() => onClose(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-4">
              <p className="text-sm text-gray-500 mb-4">
                Select which columns to display in the table. You must select at
                least one column.
              </p>

              <Select
                isMulti
                name="columns"
                options={options}
                className="basic-multi-select"
                classNamePrefix="select"
                value={options.filter((option) =>
                  selected.includes(option.value)
                )}
                onChange={(selectedOptions) => {
                  if (selectedOptions && selectedOptions.length > 0) {
                    onSelectedChange(
                      selectedOptions.map((option) => option.value)
                    );
                  }
                }}
                placeholder="Select columns to display"
              />

              <div className="flex justify-between mt-6">
                <button
                  onClick={() =>
                    onSelectedChange(allColumns.map((col) => col.key))
                  }
                  className="px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                >
                  Select All
                </button>

                <button
                  onClick={() => onSelectedChange(["name"])}
                  className="px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                  disabled={selected.length <= 1}
                >
                  Reset to Default
                </button>
              </div>
            </div>

            <div className="flex justify-end gap-2 p-4 border-t">
              <button
                onClick={() => onClose(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                Apply Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
