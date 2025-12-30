import { DateTime } from "luxon";

import { useState } from "react";

import { CiTimer } from "react-icons/ci";
import { ImCheckmark, ImCross } from "react-icons/im";

import Modal from "react-modal";

import { completeHabit, unCompleteHabit } from "../../../api/habitRow";

import useHabitStore from "../../../store/habitStore";

export default function UpdateCompleteDateModal({
  date,
  habitId,
  isDateChecked,
  isModalOpen,
  onModalClose,
}) {
  const [minutes, setMinutes] = useState(30);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);

  const setCompleteHabit = useHabitStore((state) => state.setCompleteHabit);
  const setUnCompleteHabit = useHabitStore((state) => state.setUnCompleteHabit);

  const handleDeleteDate = async () => {
    try {
      if (isDateChecked === false || !habitId || !date) {
        onModalClose();
        setIsError(null);
        return;
      }

      setIsLoading(true);

      await unCompleteHabit({
        habitId,
        date: DateTime.fromJSDate(date).toISODate(),
      });

      setUnCompleteHabit(habitId, DateTime.fromJSDate(date).toISODate());
      onModalClose();
    } catch (error) {
      setIsError(error.message);
    } finally {
      setIsLoading(false);
      setIsError(null);
    }
  };

  const handleCompleteDate = async () => {
    try {
      if (isDateChecked === true || !habitId || !date) {
        onModalClose();
        return;
      }

      setIsLoading(true);

      await completeHabit({
        habitId,
        date: DateTime.fromJSDate(date).toISODate(),
      });

      setCompleteHabit(habitId, DateTime.fromJSDate(date).toISODate());
      setIsError(null);
      onModalClose();
    } catch (error) {
      setIsError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      ariaHideApp={false}
      isOpen={isModalOpen}
      style={{
        overlay: { backgroundColor: "rgba(0, 0, 0, 0.1)" },
        content: {
          border: "none",
          padding: 0,
          backgroundColor: "#1A1A1A",
          width: "fit-content",
          height: "fit-content",
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
        },
      }}
    >
      <div className="flex items-center gap-2 px-3 py-3 text-white">
        <CiTimer size={20} />
        <p className="text-sm font-semibold">How much time (minutes) you do habit today.</p>
        <input
          className="w-[70px] ml-8 pl-2 text-white border border-[#4a4a4a] rounded focus:outline-none"
          type="number"
          placeholder="minutes"
          value={minutes}
          onChange={(e) => setMinutes(e.target.value)}
        />
      </div>
      {isError && (
        <div className="flex flex-1 items-center justify-center pb-3">
          <p className="font-semibold text-sm text-center text-red-500">
            {`${isError} Please try again later`}
          </p>
        </div>
      )}
      <div className="flex flex-1 border-t border-[#4a4a4a]">
        <button
          disabled={isLoading}
          type="button"
          className="flex flex-1 items-center justify-center py-3 text-[#4a4a4a] border-r cursor-pointer hover:bg-[#2a2a2a] disabled:cursor-not-allowed"
          onClick={() => handleDeleteDate()}
        >
          <ImCross />
        </button>
        <button
          disabled={isLoading}
          type="button"
          className="flex flex-1 items-center justify-center py-3 text-white cursor-pointer hover:bg-[#2a2a2a] disabled:cursor-not-allowed"
          onClick={() => handleCompleteDate()}
        >
          <ImCheckmark />
        </button>
      </div>
    </Modal>
  );
}
