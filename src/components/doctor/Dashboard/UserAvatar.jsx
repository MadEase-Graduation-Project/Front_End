import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { LogOut, Settings, User, PoundSterlingIcon } from "lucide-react";
import MaleAvatar from "@/assets/doctor-M.png";
import FemaleAvatar from "@/assets/doctor-F.png";

export function UserAvatar({ name, gender, email }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/register/login");
  };

  const imageSrc = gender === "Female" ? FemaleAvatar : MaleAvatar;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage src={imageSrc} alt="Doctor Avatar" />
          <AvatarFallback>Doc</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuItem className="flex items-center gap-2">
          <div className="text-start">
            <span className="block font-semibold">{name}</span>
            <span className="text-xs block text-gray-500">{email}</span>
          </div>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/doctor/settings")}
        >
          <Settings size={16} /> Settings
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="cursor-pointer">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-500"
          >
            <LogOut size={16} /> Log Out
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
