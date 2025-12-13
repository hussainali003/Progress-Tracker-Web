// Utility function to convert "hh:mm am/pm" string to minutes (from midnight)
export const convertTimeTextToNumber = (timeText) => {
  // Regex to match formats like 9:00am, 12:30pm, 8:00 am, 5pm, etc.
  const timeRegex = /^(\d{1,2}):?(\d{2})?\s*(am|pm)$/i;
  const match = timeText.trim().toLowerCase().match(timeRegex);

  if (!match) {
    return null; // Indicates invalid format
  }

  const [_, hourStr, minuteStr, period] = match;

  let hours = parseInt(hourStr, 10);
  const minutes = minuteStr ? parseInt(minuteStr, 10) : 0; // Minutes are optional

  // Basic hour and minute validation
  if (hours < 1 || hours > 12 || minutes < 0 || minutes > 59) {
    return null;
  }

  // Convert 12-hour to 24-hour format
  if (period === "pm" && hours !== 12) {
    hours += 12; // e.g., 1pm becomes 13 hours
  } else if (period === "am" && hours === 12) {
    hours = 0; // e.g., 12am (midnight) becomes 0 hours
  }

  // Total minutes from midnight
  const minutesFromMidnight = hours * 60 + minutes;

  return minutesFromMidnight;
};
