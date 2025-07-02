import { Input } from "@/components/ui/input";
import { Bell } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Header({ search = "", setSearch = () => {} }) {
  return (
    <div className="w-full flex items-center justify-between p-4 border-b bg-white shadow-sm sticky top-0 z-50">

      {/* Left: (Removed Logo and Title) */}
      <div />

      {/* Middle: Search Bar */}
      <div className="w-[200px] sm:w-[250px] md:w-[300px]">
        <Input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Right: Notifications and User */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <Bell className="w-5 h-5 text-gray-600 cursor-pointer" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
            3
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src="https://i.pravatar.cc/300" alt="User" />
            <AvatarFallback>NU</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium text-gray-700 hidden sm:block">User</span>
        </div>
      </div>
    </div>
  );
}
