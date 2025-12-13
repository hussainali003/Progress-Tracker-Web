import { useEffect, useRef, useState } from "react";

export default function ColorDropDownButton({ color, setColor }) {
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
    <div className="relative flex items-center" ref={dropdownRef}>
      <button
        type="button"
        className="w-full px-2 py-2  rounded cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <div style={{ backgroundColor: `#${color}` }} className="w-5 h-5" />
      </button>
      {open && (
        <div className="absolute top-9 w-full p-2 bg-[#464646] rounded mt-3 shadow-xl z-50">
          {colors.map((item) => (
            <button
              type="button"
              key={item}
              onClick={() => {
                setColor(item);
                setOpen(false);
              }}
              style={{ backgroundColor: `#${item}` }}
              className={`w-5 h-5 block mb-2 rounded-full cursor-pointer`}
            ></button>
          ))}
        </div>
      )}
    </div>
  );
}

const colors = [
  "FFFFFF",
  "5487f6",
  "f65454",
  "f6a154",
  "f6e154",
  "54f68c",
  "54d2f6",
  "9b54f6",
  "f654d0",
];
