import { fetchEvents } from "@/app/lib/data";
import { type NextRequest } from "next/server";
import { sendEmail } from "@/app/lib/utils";

export async function GET(req: NextRequest) {
  // send reminder via email or SMS?
  const searchParams = req.nextUrl.searchParams;
  const dateStr = searchParams.get("date") || new Date();

  let events = await fetchEvents(new Date(dateStr));
  if (events.length > 0) {
    sendEmail(
      process.env.REMINDER_RECEIVER || "",
      "🎂 Birthday reminder email",
      "<center><h1>Don't forget to wish following person today 😊</h1>" +
        events
          .map((str) => {
            return "<h3>" + str + "</h3>";
          })
          .join("") +
        "</center>"
    );
  }

  return Response.json(events);
}
