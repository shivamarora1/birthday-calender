import { getDaysInMonth, getMonthName } from "../lib/utils";
import Day from "./day";
import MonthHeading from "./month-heading";

export default function Month({
  month,
  year,
}: {
  month: number;
  year: number;
}) {
  const monthName = getMonthName(month);
  const daysInMonth = getDaysInMonth(year, month);

  const elements = [];
  let day = 1;

  while (day <= daysInMonth) {
    elements.push(<Day key={day} date={new Date(year, month, day)} />);
    day++;
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center my-4">
        <MonthHeading month={monthName + " " + year} />
        <div className="grid grid-cols-7 w-fit">{elements}</div>
      </div>
    </>
  );
}
