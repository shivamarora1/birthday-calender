export function getMonthName(month: number): String {
  // 0 indexed month.
  const allMonths = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return allMonths[month];
}

export function getDayName(year: number, month: number, day: number): String {
  // 0 indexed month.
  const date = new Date(year, month, day, 0, 0, 0, 0);
  return date.toLocaleDateString("en", { weekday: "long" });
}

export function getDaysInMonth(year: number, month: number): number {
  // 0 indexed month.
  if (month >= 11) {
    month = -1;
  } else if (month <= 0) {
    month = 0;
  }
  const dt = new Date(year, month + 1, 0);
  return dt.getDate();
}
