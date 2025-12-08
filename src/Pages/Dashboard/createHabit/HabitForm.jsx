import { useState } from "react";
import { AiOutlineStop } from "react-icons/ai";
import { GoBell } from "react-icons/go";
import { PiFlagBannerFoldLight } from "react-icons/pi";
import { TiArrowRepeat } from "react-icons/ti";

import DropDown from "../../../components/DropDown";
import StartDateDropdown from "./components/StartDateDropdown";

export default function HabitForm({ onClose }) {
  const [repeat, setRepeat] = useState({ label: "Every Day", value: "every day" });
  const [endCondition, setEndCondition] = useState({ label: "Never", value: "never" });
  const [startDate, setStartDate] = useState(new Date());

  return (
    <div className="h-full flex flex-col text-white">
      {/* Habit Name */}
      <div className="flex border border-[#333333]">
        <button type="button" className="px-3 py-3 border-r border-[#333333]">
          <div className="w-5 h-5 bg-sky-500" />
        </button>
        <input
          className="py-3 pl-3 bg-transparent text-[#898889] placeholder-[#898889] focus:outline-none"
          placeholder="Enter Habit Name"
        />
      </div>
      {/* Habit Details */}
      <div className="w-full flex justify-between px-3 py-3 border border-[#333333] border-t-0">
        <div className="flex gap-2 items-center">
          <TiArrowRepeat color="white" size={18} />
          <h1 className="text-white">Repeat</h1>
        </div>
        <DropDown
          className="w-[30%]"
          value={repeat}
          onChange={setRepeat}
          label="Every Day"
          options={[
            { label: "Every Day", value: "every day" },
            { label: "Sunday", value: "sunday" },
            { label: "Monday", value: "monday" },
            { label: "Tuesday", value: "tuesday" },
            { label: "Wednesday", value: "wednesday" },
            { label: "Thursday", value: "thursday" },
            { label: "Friday", value: "friday" },
            { label: "Saturday", value: "saturday" },
          ]}
        />
      </div>
      <div className="w-full flex justify-between px-3 py-3 border border-[#333333] border-t-0">
        <div className="flex gap-2 items-center">
          <PiFlagBannerFoldLight color="white" size={18} />
          <h1 className="text-white">Start Date</h1>
        </div>
        <StartDateDropdown className="w-[45%]" date={startDate} onDateChange={setStartDate} />
      </div>
      <div className="w-full flex justify-between px-3 py-3 border border-[#333333] border-t-0">
        <div className="flex gap-2 items-center">
          <AiOutlineStop color="white" size={18} />
          <h1 className="text-white">End Condition</h1>
        </div>
        <DropDown
          className="w-[30%]"
          value={endCondition}
          onChange={setEndCondition}
          label="Never"
          options={[
            { label: "Never", value: "never" },
            { label: "On a date", value: "on a date" },
          ]}
        />
      </div>
      <div className="w-full flex px-3 py-3 border border-[#333333] border-t-0">
        <div className="flex gap-2 items-center">
          <GoBell color="white" size={18} />
          <h1 className="text-white">Reminder</h1>
        </div>
      </div>
      {/* Footer */}
      <div className="flex items-center justify-end mt-auto px-3 py-3 gap-2 border-t border-[#333333] bg-[#242424]">
        <button
          type="button"
          className="font-medium p-2 text-sm border border-[#424242] rounded-sm cursor-pointer"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={true}
          className="font-medium p-2 text-sm rounded-sm bg-[#5487f6] disabled:bg-[#505050] text-gray-400 cursor-not-allowed"
        >
          save
        </button>
      </div>
    </div>
  );
}
