import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

export default function FilterColumns({
  isOpen,
  onClose,
  options,
  selected,
  onSelectedChange,
  allColumns,
}) {
  const handleColumnToggle = (columnValue, isChecked) => {
    if (isChecked) {
      onSelectedChange([...selected, columnValue]);
    } else {
      // Prevent unchecking if it's the last selected column
      if (selected.length > 1) {
        onSelectedChange(selected.filter((col) => col !== columnValue));
      }
    }
  };

  const handleSelectAll = () => {
    onSelectedChange(allColumns.map((col) => col.key));
  };

  const handleReset = () => {
    onSelectedChange(["name"]);
  };

  const isAllSelected = selected.length === allColumns.length;
  const selectedCount = selected.length;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
              <Check className="h-4 w-4 text-blue-600" />
            </div>
            Customize Table Columns
          </DialogTitle>
          <DialogDescription>
            Select which columns to display in the table. You must select at
            least one column.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Selection Summary */}
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              {selectedCount} of {allColumns.length} columns selected
            </span>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleSelectAll}
                disabled={isAllSelected}
              >
                Select All
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleReset}
                disabled={selected.length <= 1}
              >
                Reset
              </Button>
            </div>
          </div>

          <Separator />

          {/* Column Options */}
          <ScrollArea className="h-64 w-full">
            <div className="space-y-3 pr-4">
              {options.map((option) => {
                const isChecked = selected.includes(option.value);
                const isLastSelected = selected.length === 1 && isChecked;

                return (
                  <div
                    key={option.value}
                    className={`flex items-center space-x-3 p-3 rounded-lg border transition-colors ${
                      isChecked
                        ? "bg-blue-50 border-blue-200"
                        : "bg-white border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    <Checkbox
                      id={option.value}
                      checked={isChecked}
                      onCheckedChange={(checked) =>
                        handleColumnToggle(option.value, checked)
                      }
                      disabled={isLastSelected}
                    />
                    <Label
                      htmlFor={option.value}
                      className={`flex-1 cursor-pointer font-medium ${
                        isChecked ? "text-blue-900" : "text-gray-700"
                      } ${isLastSelected ? "opacity-50" : ""}`}
                    >
                      {option.label}
                    </Label>
                    {isChecked && <Check className="h-4 w-4 text-blue-600" />}
                  </div>
                );
              })}
            </div>
          </ScrollArea>

          {selected.length === 1 && (
            <div className="flex items-center gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <div className="h-4 w-4 rounded-full bg-amber-500 flex items-center justify-center">
                <span className="text-xs text-white font-bold">!</span>
              </div>
              <p className="text-sm text-amber-800">
                At least one column must remain selected
              </p>
            </div>
          )}
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => onClose(false)}>
            Cancel
          </Button>
          <Button
            onClick={() => onClose(false)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Apply Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
