import { useEffect, useState } from "react";

import { AiOutlineStop } from "react-icons/ai";
import { FaTrash } from "react-icons/fa";
import { GoBell } from "react-icons/go";
import { TiArrowRepeat } from "react-icons/ti";

import { getHabitDetail } from "../../../../api/habit";

import HabitDeleteModal from "../HabitDeleteModal";

import ColorDropDownButton from "./components/ColorDropDownButton";
import DateDropDownButton from "./components/DateDropDownButton";
import EndDateDropDownButton from "./components/EndDateDropDownButton";
import RepeatDropDownButton from "./components/RepeatDropdownButton";
import TimeInput from "./components/TimeInput";

export default function ModalForm({ habitId, onClose }) {
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [repeat, setRepeat] = useState([]);
  const [endCondition, setEndCondition] = useState({ label: "Never", value: "never" });
  const [endDate, setEndDate] = useState(null);
  const [reminder, setReminder] = useState(590); // default to 9:00 am

  const [isHabitDeleteModalOpen, setIsHabitDeleteModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);

  useEffect(() => {
    const loadHabitDetail = async () => {
      try {
        setIsLoading(true);
        const habit = await getHabitDetail({ habitId });

        setName(habit.name);
        setColor(habit.color);
        setRepeat(habit.repeatDays);
        setEndDate(habit.endDate);
        setReminder(habit.reminder);
      } catch (error) {
        setIsError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadHabitDetail();
  }, [habitId]);

  // Clear end date if end condition is not "on a date"
  useEffect(() => {
    if (endCondition?.value !== "on a date") {
      setEndDate(null);
    }
  }, [endCondition]);

  const handleUpdateHabit = async () => {
    setIsLoading(true);

    setTimeout(() => {
      onClose();
      setIsLoading(false);
    }, 1000);
  };

  return isLoading ? (
    <div className="h-full flex flex-1 items-center justify-center">
      <div className="w-8 h-8 border-2 border-[#FFFFFF] border-t-transparent rounded-full animate-spin"></div>
    </div>
  ) : (
    <div className="h-full flex flex-col text-white">
      {/* Habit Name */}
      <div className="flex border border-[#333333]">
        <ColorDropDownButton color={color} setColor={setColor} />
        <input
          className="py-3 text-[#898889] placeholder-[#898889] bg-transparent focus:outline-none"
          placeholder="Enter New Habit Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
      <div
        className={`w-full flex justify-between px-3 py-3 border border-t-0 border-[#333333] ${
          endCondition?.value === "never" ? "items-center" : "items-start"
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
          {endCondition?.value === "on a date" && (
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
      {isError && <p className="mt-3 text-center  text-red-400">{isError}</p>}
      {/* Footer */}
      <div className="flex mt-auto px-3 py-3 border-t border-[#333333] bg-[#242424]">
        <button
          type="button"
          disabled={isLoading}
          className="p-2 font-medium text-sm cursor-pointer disabled:cursor-not-allowed group"
          onClick={() => setIsHabitDeleteModalOpen(true)}
        >
          <FaTrash className="text-gray-400 text-xl group-hover:text-red-500" />
        </button>
        <div className="flex ml-auto gap-2">
          <button
            type="button"
            disabled={isLoading}
            className="p-2 font-medium text-sm border border-[#424242] rounded-sm cursor-pointer disabled:cursor-not-allowed"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={isLoading}
            onClick={handleUpdateHabit}
            className="p-2 font-medium text-sm text-white rounded-sm bg-[#5487f6] cursor-pointer disabled:bg-[#505050] disabled:text-gray-400 disabled:cursor-not-allowed"
          >
            Save
          </button>
        </div>
      </div>
      <HabitDeleteModal
        habitId={habitId}
        isHabitDeleteModalOpen={isHabitDeleteModalOpen}
        onHabitDeleteModalClose={() => setIsHabitDeleteModalOpen(false)}
      />
    </div>
  );
}
