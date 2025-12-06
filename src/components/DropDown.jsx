import { useEffect, useRef, useState } from "react";
import { FaChevronUp } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa6";

export default function DropDown({
  label,
  options = [],
  value,
  onChange,
  className = "",
  optionClassName = "",
}) {
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
        className="w-full flex justify-between items-center px-2 py-2 text-xs text-start text-white rounded bg-neutral-800"
      >
        {value ? value.label : label}
        {open ? <FaChevronUp /> : <FaChevronDown />}
      </button>

      {open && (
        <div className="absolute w-full bg-neutral-900 rounded mt-2 shadow-xl z-50">
          {options.map((opt) => (
            <button
              type="button"
              key={opt.value}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              className={`w-full block text-start px-3 py-2 text-xs hover:bg-neutral-700 cursor-pointer ${optionClassName}`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
