import { useEffect, useState } from "react";

import { AiOutlineStop } from "react-icons/ai";
import { GoBell } from "react-icons/go";
import { PiFlagBannerFoldLight } from "react-icons/pi";
import { TiArrowRepeat } from "react-icons/ti";

import { createHabit } from "../../../api/habit";

import useHabitStore from "../../../store/habitStore";

import { createHabitSchema } from "../../../validation/createSchema";

import ColorDropDownButton from "./components/ColorDropDownButton";
import DateDropDownButton from "./components/DateDropDownButton";
import EndDateDropDownButton from "./components/EndDateDropDownButton";
import RepeatDropDownButton from "./components/RepeatDropdownButton";
import TimeInput from "./components/TimeInput";

export default function HabitForm({ onClose }) {
  const [habit, setHabit] = useState("");
  const [color, setColor] = useState("5487F6");
  const [repeat, setRepeat] = useState([0, 1, 2, 3, 4, 5, 6]);
  const [endCondition, setEndCondition] = useState({ label: "Never", value: "never" });
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const [reminder, setReminder] = useState(540); // default to 9:00 am
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const addHabit = useHabitStore((state) => state.addHabit);

  // Clear end date if end condition is not "on a date"
  useEffect(() => {
    if (endCondition.value !== "on a date") {
      setEndDate(null);
    }
  }, [endCondition]);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      setError(null);
      setIsLoading(true);

      const formData = {
        habit,
        color,
        repeat,
        startDate,
        endDate,
        reminder,
      };

      await createHabitSchema.validate(formData, { abortEarly: false });

      const habitDetail = await createHabit(formData);

      addHabit({
        id: habitDetail.id,
        habit: habitDetail.habit,
        color: habitDetail.color,
        completedDates: [],
      });

      onClose();
    } catch (err) {
      if (err.name === "ValidationError") {
        setError(err.errors[0]);
      } else {
        setError(err.message || "An unknown registration error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col text-white">
      {/* Habit Name */}
      <div className="flex border border-[#333333]">
        <ColorDropDownButton color={color} setColor={setColor} />
        <input
          className="py-3 text-[#898889] placeholder-[#898889] bg-transparent focus:outline-none"
          placeholder="Enter Habit Name"
          type="text"
          value={habit}
          onChange={(e) => setHabit(e.target.value)}
        />
      </div>
      {/* Habit Details */}
      <div className="w-full flex justify-between px-3 py-3 border border-t-0 border-[#333333]">
        <div className="flex gap-2 items-center">
          <TiArrowRepeat color="white" size={18} />
          <h1 className="text-white">Repeat</h1>
        </div>
        <RepeatDropDownButton repeat={repeat} setRepeat={setRepeat} />
      </div>
      <div className="w-full flex justify-between px-3 py-3 border border-[#333333] border-t-0">
        <div className="flex gap-2 items-center">
          <PiFlagBannerFoldLight color="white" size={18} />
          <h1 className="text-white">Start Date</h1>
        </div>
        <DateDropDownButton
          className="w-[45%]"
          label="start"
          date={startDate}
          onDateChange={setStartDate}
        />
      </div>
      <div
        className={`w-full flex justify-between px-3 py-3 border border-t-0 border-[#333333] ${
          endCondition.value === "never" ? "items-center" : "items-start"
        }`}
      >
        <div className="flex gap-2 items-center">
          <AiOutlineStop color="white" size={18} />
          <h1 className="text-white">End Condition</h1>
        </div>
        <div className="w-[45%] gap-2 flex flex-col">
          <EndDateDropDownButton
            endCondition={endCondition}
            setEndCondition={setEndCondition}
            label="Never"
          />
          {endCondition.value === "on a date" && (
            <DateDropDownButton label="end" date={endDate} onDateChange={setEndDate} />
          )}
        </div>
      </div>
      <div className="w-full flex justify-between px-3 py-3 border border-[#333333] border-t-0">
        <div className="flex gap-2 items-center">
          <GoBell color="white" size={18} />
          <h1 className="text-white">Reminder</h1>
        </div>
        <TimeInput reminder={reminder} setReminder={setReminder} />
      </div>
      {/* error message */}
      {error && <p className="mt-3 text-center  text-red-400">{error}</p>}
      {/* Footer */}
      <div className="flex items-center justify-end gap-2 mt-auto px-3 py-3 border-t border-[#333333] bg-[#242424]">
        <button
          type="button"
          className="p-2 font-medium text-sm border border-[#424242] rounded-sm cursor-pointer"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          type="button"
          disabled={isLoading}
          onClick={handleCreate}
          className="p-2 font-medium text-sm text-white rounded-sm bg-[#5487f6] cursor-pointer disabled:bg-[#505050] disabled:text-gray-400 disabled:cursor-not-allowed"
        >
          save
        </button>
      </div>
    </div>
  );
}
