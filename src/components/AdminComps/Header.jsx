import { GoBellFill, GoSearch } from "react-icons/go";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";

export default function Header({ title }) {
  const [search, setSearch] = useState("");
  return (
    <header className="flex h-12 lg:h-16 md:h-14 ">
      <div className="flex w-full items-center justify-between">
        <h1 className=" text-xl sm:text-2xl font-medium">{title}</h1>
        <div className="flex justify-end gap-2 items-center ">
          <div className="searchbox flex gap-1 items-center border rounded-3xl bg-white p-1 truncate ">
            <GoSearch className="w-7 " size={20} />
            <input
              value={search}
              type="text"
              placeholder="Search..."
              className=" focus:outline-none w-20 sm:w-full"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button className="px-2  text-gray-600 hover:text-violet-700">
            <GoBellFill size={20} />
          </button>
          <button className="profile-btn ">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </button>
        </div>
      </div>
    </header>
  );
}
