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
      <MonthHeading month={monthName + " " + year} />
      <div>{elements}</div>
    </>
  );
}
