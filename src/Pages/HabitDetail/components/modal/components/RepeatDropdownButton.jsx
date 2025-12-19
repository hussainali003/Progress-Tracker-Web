import { useEffect, useRef, useState } from "react";
import { FaChevronUp } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa6";

export default function RepeatDropDownButton({ repeat, setRepeat }) {
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

  const handleCheck = (e, opt) => {
    const isChecked = e.target.checked;

    if (isChecked) {
      setRepeat((prevState) => {
        if (!prevState.includes(opt)) {
          return [...prevState, opt];
        } else {
          return prevState;
        }
      });
    } else {
      setRepeat((prevState) => prevState.filter((item) => item !== opt));
    }
  };

  const handleEveryDayCheck = (e) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      setRepeat([0, 1, 2, 3, 4, 5, 6]);
    } else {
      setRepeat([]);
    }
  };

  return (
    <div className={`relative w-[30%]`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center px-2 py-2 text-xs text-start text-white rounded bg-neutral-800"
      >
        {repeat.length === 7
          ? "Every Day"
          : repeat.length === 0
            ? "No Days Selected"
            : `${repeat.length} Days Selected`}
        {open ? <FaChevronUp /> : <FaChevronDown />}
      </button>

      {open && (
        <div className="absolute w-full bg-[#464646] rounded mt-2 shadow-xl z-50">
          <div
            className={`flex justify-between px-3 py-2 text-xs hover:bg-neutral-700 cursor-pointer rounded-t`}
          >
            <p className="text-start">Every Day</p>
            <input type="checkbox" checked={repeat.length === 7} onChange={handleEveryDayCheck} />
          </div>
          {options.map((opt, index) => (
            <div
              key={opt.value}
              className={`flex justify-between px-3 py-2 text-xs hover:bg-neutral-700 cursor-pointer 
                ${index !== options.length - 1 ? "border-b border-neutral-600" : "rounded-b"}`}
            >
              <p className="text-start">{opt.label}</p>
              <input
                type="checkbox"
                checked={repeat.includes(opt.value)}
                onChange={(e) => handleCheck(e, opt.value)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const options = [
  { label: "Sunday", value: 0 },
  { label: "Monday", value: 1 },
  { label: "Tuesday", value: 2 },
  { label: "Wednesday", value: 3 },
  { label: "Thursday", value: 4 },
  { label: "Friday", value: 5 },
  { label: "Saturday", value: 6 },
];
