import { useState } from "react";

import { AiOutlineExclamationCircle } from "react-icons/ai";

import Modal from "react-modal";
import { useNavigate } from "react-router";

import { deleteHabit } from "../../../api/habit";

export default function HabitDeleteModal({
  habitId,
  isHabitDeleteModalOpen,
  onHabitDeleteModalClose,
}) {
  const navigation = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);

  const handleDeleteHabit = async () => {
    try {
      setIsError(null);
      setIsLoading(true);

      await deleteHabit({ habitId });

      onHabitDeleteModalClose();
      navigation("/dashboard");
    } catch (error) {
      setIsError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseDeleteModal = () => {
    setIsError(null);
    onHabitDeleteModalClose();
  };

  return (
    <Modal
      isOpen={isHabitDeleteModalOpen}
      ariaHideApp={false}
      style={{
        overlay: { backgroundColor: "rgba(0, 0, 0, 0.75)" },
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
      <div className="h-full flex flex-col text-white">
        <div className="flex flex-1 flex-col p-3 border-b border-[#333333]">
          <div className="flex flex-1 gap-2">
            <AiOutlineExclamationCircle className="text-red-400 self-center text-2xl" />
            <div className="flex flex-1 flex-col">
              <p className="text-md">Confirmation</p>
              <p className="text-xs">Are you sure you want to delete this habit?</p>
            </div>
          </div>
          {isError && <p className="mt-2 text-xs text-center  text-red-400">{isError}</p>}
        </div>
        <div className="flex items-center justify-end gap-2 p-3">
          <button
            type="button"
            disabled={isLoading}
            className="p-2 font-semibold text-xs rounded hover:bg-white/10 cursor-pointer disabled:cursor-not-allowed"
            onClick={handleCloseDeleteModal}
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
