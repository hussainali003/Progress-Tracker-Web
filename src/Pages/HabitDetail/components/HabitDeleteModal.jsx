import { useState } from "react";

import { AiOutlineExclamationCircle } from "react-icons/ai";
import Modal from "react-modal";
import { useNavigate } from "react-router";

export default function HabitDeleteModal({ isHabitDeleteModalOpen, onHabitDeleteModalClose }) {
  const navigation = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteHabit = async () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      navigation("/dashboard");
      onHabitDeleteModalClose();
    }, 1000);
  };

  return (
    <Modal
      isOpen={isHabitDeleteModalOpen}
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
            <AiOutlineExclamationCircle className="text-red-400 text-2xl" />
            <p className="text-lg">Confirmation</p>
          </div>
          <p className="ml-8 text-xs">Are you sure you want to delete this habit?</p>
        </div>
        <div className="flex items-center justify-end  gap-2 p-3">
          <button
            type="button"
            disabled={isLoading}
            className="p-2 font-semibold text-xs rounded hover:bg-white/10 cursor-pointer disabled:cursor-not-allowed"
            onClick={onHabitDeleteModalClose}
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={isLoading}
            className="p-2 font-semibold text-xs text-red-500 border rounded border-red-500/50 bg-red-800/20 hover:bg-red-500/20 cursor-pointer disabled:cursor-not-allowed"
            onClick={handleDeleteHabit}
          >
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );
}
