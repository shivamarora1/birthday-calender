import { sql } from "@vercel/postgres";
import { event, eventsDataType } from "./definitions";
// fetching all events at once
export async function fetchAllEvents() {
  try {
    const data = await sql<event>`SELECT * FROM events`;
    const birthdayEvents = data.rows.reduce((acc: eventsDataType, event) => {
      const { month, day, title } = event;
      acc[month] = acc[month] || {};
      acc[month][day] = acc[month][day] || [];
      acc[month][day].push(title);
      return acc;
    }, {});
    return birthdayEvents;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch events data.");
  }
}
export async function saveEvent(ev: event) {
  try {
    if (!ev.month || !ev.day || !ev.title)
      throw new Error("Month, Day, Title is required");
    await sql`INSERT INTO events(month,day,title)VALUES(${ev.month},${ev.day},${ev.title});`;
    return "success"
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to save event data.");
  }
}
