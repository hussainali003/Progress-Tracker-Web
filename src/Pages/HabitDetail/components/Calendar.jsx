import { DayPicker, getDefaultClassNames } from "react-day-picker";

import { NextMonthButton, PreviousMonthButton } from "./CalendarNavButton";

const getDateString = (offset) => {
  const date = new Date();
  date.setDate(date.getDate() - offset);
  return date;
};

export default function Calendar() {
  const defaultClassNames = getDefaultClassNames();

  return (
    <DayPicker
      components={{
        PreviousMonthButton,
        NextMonthButton,
      }}
      mode="multiple"
      disabled={{ after: new Date() }}
      selected={[getDateString(0), getDateString(1), getDateString(2)]}
      classNames={{
        root: `${defaultClassNames.root} text-white`,
        months: `${defaultClassNames.months} !max-w`,
        month: `w-full `,
        month_grid: "w-full",
        weeks: "gap-4",
        month_caption: `p-2`,
        caption_label: `${defaultClassNames.caption_label} !z-0`,
        weekday: "text-center text-neutral-400 text-xs",
        day: `text-center py-1 hover:bg-neutral-700`,
        day_button: `w-full h-full text-center cursor-pointer`,
        today: "text-blue-400",
        selected: "!text-white border-none  !bg-blue-400",
      }}
    />
  );
}
