import { useState } from "react";

import { AiOutlineWarning } from "react-icons/ai";
import Modal from "react-modal";

export default function HabitUpdateCompletedDateModal({
  isHabitUpdateCompletedDateModalOpen,
  onHabitUpdateCompletedDateModalClose,
}) {
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdateCompletedDays = async () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      onHabitUpdateCompletedDateModalClose();
    }, 1000);
  };

  return (
    <Modal
      isOpen={isHabitUpdateCompletedDateModalOpen}
      ariaHideApp={false}
      style={{
        overlay: { backgroundColor: "rgba(0, 0, 0, 0.75)" },
        content: {
          top: "43%",
          bottom: "42%",
          left: "35%",
          right: "35%",
          border: "none",
          padding: 0,
          backgroundColor: "#1A1A1A",
        },
      }}
    >
      <div className="h-full flex flex-col text-white">
        <div className="p-4 border-b border-[#333333]">
          <div className="flex items-center gap-2 ">
            <AiOutlineWarning className="text-yellow-400 text-2xl" />
            <p className="text-lg">Confirmation</p>
          </div>
          <p className="ml-8 text-xs">Are you sure you want to update the completed habit days.</p>
        </div>
        <div className="flex items-center justify-end  gap-2 p-3">
          <button
            type="button"
            disabled={isLoading}
            className="p-2 font-semibold text-xs rounded hover:bg-white/10 cursor-pointer disabled:cursor-not-allowed"
            onClick={onHabitUpdateCompletedDateModalClose}
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={isLoading}
            className="p-2 font-semibold text-xs text-yellow-500 border rounded border-yellow-500/50 bg-yellow-800/20 hover:bg-yellow-500/20 cursor-pointer disabled:cursor-not-allowed"
            onClick={handleUpdateCompletedDays}
          >
            Update
          </button>
        </div>
      </div>
    </Modal>
  );
}
