import { useEffect, useRef, useState } from "react";
import { DayPicker } from "react-day-picker";

import { FaChevronUp } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa6";

import { NextMonthButton, PreviousMonthButton } from "./CalendarNavButton";

export default function DateDropDownButton({ label, date, onDateChange, className }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={
          "w-full flex justify-between items-center px-2 py-2 text-xs text-start text-white rounded bg-neutral-800"
        }
      >
        {date ? date.toDateString() : `Select ${label} date`}
        {open ? <FaChevronUp /> : <FaChevronDown />}
      </button>
      {open && (
        <div className="w-full absolute z-50 mt-2 bg-[#464646] border border-neutral-700 rounded shadow-xl">
          <DayPicker
            mode="single"
            selected={date}
            onSelect={(date) => {
              onDateChange(date);
              setOpen(false);
            }}
            disabled={{ before: new Date() }}
            components={{
              PreviousMonthButton,
              NextMonthButton,
            }}
            className="w-full"
            classNames={{
              month_grid: "w-full table-fixed border-collapse",
              month_caption: "p-2",
              weekdays: "w-full",
              week: "w-full",
              weekday: "text-center text-neutral-400 text-xs",
              day: "w-full hover:bg-neutral-700 rounded",
              today: "text-blue-400",
              selected: "!text-white border-none rounded !bg-blue-400",
            }}
          />
        </div>
      )}
    </div>
  );
}
