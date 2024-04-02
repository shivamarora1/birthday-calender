import { dayEventsType, eventsDataType } from "@/app/lib/definitions";
import axios from "axios";
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

// ! delete me after use.
export const eventsData: eventsDataType = {
  2: { 7: ["Shivam's Birthday"] },
};

export function getDayEventsByMonth(
  data: eventsDataType,
  month: number
): dayEventsType {
  if (data && month in data) {
    return data[month] || {};
  }
  return {};
}

export function getDayEventsByDate(data: dayEventsType, day: number): String[] {
  if (day in data) {
    return data[day];
  }
  return [];
}

export function addDayEvent(
  allEvents: eventsDataType,
  month: number,
  day: number,
  event: string
): eventsDataType {
  let newAllEvents: eventsDataType = { ...allEvents };
  if (month in newAllEvents) {
    let monthData: dayEventsType = newAllEvents[month] || {};
    if (day in monthData) {
      let events = monthData[day];
      events.push(event);
    } else {
      monthData[day] = [event];
    }
    newAllEvents[month] = monthData;
  } else {
    newAllEvents[month] = { [day]: [event] };
  }
  return newAllEvents;
}

// * mail gun client to send email.
export async function sendEmail(to: string, subject: string, htmlContent: string) {
  const apiKey = process.env.MAILGUN_API_KEY || "";
  const domain = process.env.MAILGUN_DOMAIN;
  const from = process.env.MAILGUN_FROM || "";

  await axios
    .post(
      `https://api.mailgun.net/v3/${domain}/messages`,
      `from=${encodeURIComponent(from)}&to=${encodeURIComponent(
        to
      )}&subject=${encodeURIComponent(subject)}&html=${encodeURIComponent(
        htmlContent
      )}`,
      {
        auth: {
          username: "api",
          password: apiKey,
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )
    .then((response) => {
      console.log("Email sent successfully:", response.data);
    })
    .catch((error) => {
      console.error("Error sending email:", error.response.data);
    });
}
