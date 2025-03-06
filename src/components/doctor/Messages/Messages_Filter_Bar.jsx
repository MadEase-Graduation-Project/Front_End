import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { MenuIcon, PlusCircle, PlusIcon } from "lucide-react";

export default function Messages_Filter_Bar({ filter, setFilter, unreadCount }) {
  return (
    <div className="flex rounded-lg gap-4 flex-row mx-auto items-center justify-center">
      <ToggleGroup
        type="single"
        value={filter}
        onValueChange={(value) => value && setFilter(value)}
        className="flex gap-2 bg-gray-50 p-2 rounded-lg w-fit px-4 my-4"
      >
        <ToggleGroupItem
          value="all"
          className="px-4 py-2 rounded-md data-[state=on]:bg-gray-300 data-[state=on]:text-gray-900"
        >
          All Mail
        </ToggleGroupItem>

        {/* Unread Tab with Badge */}
        <div className="relative">
          <ToggleGroupItem
            value="unread"
            className="px-4 py-2 rounded-md data-[state=on]:bg-gray-300 data-[state=on]:text-gray-900"
          >
            Unread
          </ToggleGroupItem>

          {unreadCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              {unreadCount}
            </span>
          )}
        </div>

        <ToggleGroupItem
          value="archive"
          className="px-4 py-2 rounded-md data-[state=on]:bg-gray-300 data-[state=on]:text-gray-900"
        >
          Archive
        </ToggleGroupItem>
      </ToggleGroup>
      <div className="relative my-4">
        <Button variant="outline" className="text-xl py-6 bg-gray-50 border-0 rounded-[50%]">
          <PlusIcon />
        </Button>
      </div>
    </div>
  );
}
