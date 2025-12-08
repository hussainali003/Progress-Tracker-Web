import { useState } from "react";

const timeRegex = /^(0[1-9]|1[0-2]):[0-5][0-9]\s?(am|pm)$/i;

export default function TimeInput({
  value = "",
  onChange,
  placeholder = "hh:mm am/pm",
  className = "",
}) {
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const input = e.target.value;
    onChange?.(input);

    if (input === "" || timeRegex.test(input)) {
      setError("");
    } else {
      setError("Use correct format (e.g. 09:30 am)");
    }
  };

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        className="w-full flex justify-between items-center px-2 py-2 text-xs text-start text-white rounded bg-neutral-800 focus:outline-none"
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}
