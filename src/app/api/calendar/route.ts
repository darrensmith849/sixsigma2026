import { NextRequest, NextResponse } from "next/server";
import { getCalendarEvents } from "@/lib/calendar";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const now = new Date();

  const year = Number(searchParams.get("year")) || now.getFullYear();
  const month = Number(searchParams.get("month")) || now.getMonth() + 1;

  if (month < 1 || month > 12 || year < 2020 || year > 2100) {
    return NextResponse.json([], { status: 400 });
  }

  const events = await getCalendarEvents(year, month);
  return NextResponse.json(events);
}
