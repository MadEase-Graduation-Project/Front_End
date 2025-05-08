import { useNavigate } from "react-router-dom"; // Import useNavigate
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger, 
  DropdownMenuSeparator 
} from "@/components/ui/dropdown-menu";
import { DollarSign, LogOut, PoundSterlingIcon, Settings, User } from "lucide-react";
import femaleDoctorAvatar from "@/assets/doctor-F.png";

export function UserAvatar({name , email}) {
  const navigate = useNavigate(); // Initialize navigate function

  return (
    <DropdownMenu>
      {/* Avatar (Trigger) */}
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage src={femaleDoctorAvatar} alt="Doctor Avatar" />
          <AvatarFallback>TS</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      {/* Dropdown Content */}
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuItem className="flex items-center gap-2">
          <div className="text-start">
            <span className="block font-semibold">{name}</span>
            <span className="text-xs block text-gray-500">{email}</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-center gap-2">
          <User size={16} /> Profile
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-2">
          <PoundSterlingIcon size={16} /> Billing
        </DropdownMenuItem>
        {/* ✅ Navigate to Settings Page */}
        <DropdownMenuItem 
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("settings")} // Navigate when clicked
        >
          <Settings size={16} /> Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-center gap-2 text-red-500">
          <LogOut size={16} /> Log Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
