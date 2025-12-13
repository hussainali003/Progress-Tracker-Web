// Utility function to convert minutes (from midnight) to "hh:mm am/pm" string
export const convertNumberToTimeText = (minutesFromMidnight) => {
  if (
    typeof minutesFromMidnight !== "number" ||
    minutesFromMidnight < 0 ||
    minutesFromMidnight >= 1440
  ) {
    // Return an empty string or a default value for invalid input
    return "";
  }

  // Total minutes in a day is 24 * 60 = 1440
  // Ensure the number is within 0-1439 (though the check above handles the range)

  const hours = Math.floor(minutesFromMidnight / 60);
  const minutes = minutesFromMidnight % 60;

  // Convert to 12-hour format
  const period = hours >= 12 ? "pm" : "am";
  let displayHour = hours % 12;

  // Handle 12am (0 hours) and 12pm (12 hours) cases
  if (displayHour === 0) {
    displayHour = 12; // 0 hours (midnight) is 12am, 12 hours (noon) is 12pm
  }

  // Pad minutes with a leading zero if necessary
  const displayMinutes = String(minutes).padStart(2, "0");

  return `${displayHour}:${displayMinutes}${period}`;
};
