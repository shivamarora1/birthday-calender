import { saveEvent } from "@/app/lib/data";

export async function POST(request: Request) {
  const res = await request.json();
  const result = await saveEvent({
    month: res["month"],
    day: res["day"],
    title: res["title"],
  });
  return Response.json({result});
}
