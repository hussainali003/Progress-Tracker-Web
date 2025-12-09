import { useState } from "react";

import { IoIosCreate, IoMdArrowDropdown, IoMdArrowDropright } from "react-icons/io";

export default function ControlPanel({ onOpenModal }) {
  const [open, setOpen] = useState(true);
  const user = { name: "Hussain Ali", profileImage: null };

  return (
    <div className="h-full flex flex-col flex-1 px-4 py-12">
      <div className="flex items-center gap-2 mb-2 px-2 py-2 rounded-md border border-[#4a4a4a] bg-[#323232]">
        <div className="h-6 w-6 rounded-full bg-white">
          {user.profileImage && <img src={user.profileImage} alt="logo" />}
        </div>
        <p className="font-medium text-sm text-white">{user.name}</p>
      </div>
      <button
        type="button"
        onClick={onOpenModal}
        className="flex items-center gap-1 px-2 py-2 font-inter font-medium text-start  text-sm text-white rounded-md bg-[#3662CC]"
      >
        <IoIosCreate size={18} />
        Create Habit
      </button>
      <div className="mt-4">
        <button type="button" onClick={() => setOpen(!open)} className="flex items-center ">
          {open ? (
            <IoMdArrowDropdown size={18} color="#7b7c7c" />
          ) : (
            <IoMdArrowDropright size={18} color="#7b7c7c" />
          )}
          <p className="text-[10px] font-semibold text-[#7b7c7c]">PREFERENCES</p>
        </button>
        {open && (
          <div className="flex flex-col items-start mt-1">
            <button
              type="button"
              className="w-full text-xs px-2 py-2 font-inter font-medium text-start text-[#7b7c7c] rounded-md hover:bg-[#ffffff1a]"
            >
              Settings
            </button>
            <button
              type="button"
              className="w-full text-xs px-2 py-2 font-inter font-medium text-start text-[#7b7c7c] rounded-md hover:bg-[#ffffff1a]"
            >
              Resources
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
