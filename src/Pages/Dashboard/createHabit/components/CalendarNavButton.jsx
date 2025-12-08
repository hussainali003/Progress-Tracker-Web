import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export function PreviousMonthButton({ onClick, disabled }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="flex items-center justify-center p-1 rounded text-white hover:bg-neutral-700 disabled:opacity-30"
    >
      <FiChevronLeft size={20} />
    </button>
  );
}

export function NextMonthButton({ onClick, disabled }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="flex items-center justify-center p-1 rounded text-white hover:bg-neutral-700 disabled:opacity-30"
    >
      <FiChevronRight size={20} />
    </button>
  );
}
