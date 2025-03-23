import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import React from "react";

export default function Patients_Sort_Bar({ onSortChange }) {
  return (
    <div className="flex rounded-lg gap-4 flex-row mx-auto items-center justify-center mb-3 w-full">
      <Select onValueChange={onSortChange}>
      <SelectTrigger className="w-full bg-gray-100">
        Sort by
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="newest">Newest</SelectItem>
        <SelectItem value="oldest">Oldest</SelectItem>
        <SelectItem value="alphabetical">A-Z</SelectItem>
      </SelectContent>
    </Select>
    </div>
  );
}
