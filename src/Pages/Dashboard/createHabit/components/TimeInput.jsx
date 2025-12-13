import { useEffect, useState } from "react";

import { convertNumberToTimeText } from "../../../../utils/changeNumberToString";
import { convertTimeTextToNumber } from "../../../../utils/changeStringToNumber";

export default function TimeInput({ reminder, setReminder }) {
  // Local state for the text input value (e.g., "9:00am") and validation error
  const [timeText, setTimeText] = useState(convertNumberToTimeText(reminder));
  const [error, setError] = useState("");

  // Effect to keep local timeText in sync if the parent 'reminder' prop changes
  useEffect(() => {
    setTimeText(convertNumberToTimeText(reminder));
  }, [reminder]);

  const handleChange = (e) => {
    const newTimeText = e.target.value;
    setTimeText(newTimeText); // Update the visual input immediately

    // Attempt to convert the text to minutes
    const minutesFromMidnight = convertTimeTextToNumber(newTimeText);

    if (minutesFromMidnight !== null) {
      // Conversion successful: update parent state and clear error
      setReminder(minutesFromMidnight);
      setError("");
    } else if (newTimeText === "") {
      // Allow clearing the input, maybe set reminder to null or a default
      setReminder(null); // Or set to a default value like 0 if required
      setError("");
    } else {
      // Conversion failed: set error
      setError("Invalid time format (use hh:mm am/pm)");
    }
  };

  return (
    <div className={`w-[30%] flex flex-col gap-1`}>
      {/* The input's value is now controlled by the local 'timeText' state */}
      <input
        type="text"
        value={timeText}
        placeholder="hh:mm am/pm"
        onChange={handleChange} // Use the new handleChange
        className="w-full flex justify-between items-center px-2 py-2 text-xs text-start text-white rounded bg-neutral-800 focus:outline-none"
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}
