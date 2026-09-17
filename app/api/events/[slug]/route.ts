// Takes a slug as input and return an event as output

import { NextResponse, NextRequest } from "next/server";
import connectDB from "@/lib/mongodb";
import { Event } from "@/database";

//define route params for type safety
type RouteParams = {
  params: Promise<{ slug: string }>;
};

export async function GET(
  req: NextRequest,
  { params }: RouteParams,
): Promise<NextResponse> {
  try {
    await connectDB();

    const { slug } = await params;

    if (!slug || typeof slug !== "string" || slug.trim() === "") {
      return NextResponse.json(
        { message: "Invalid or missing Slug Parameter" },
        { status: 400 },
      );
    }

    const sanitizedSlug = slug.trim().toLowerCase();
    const event = await Event.findOne({ slug: sanitizedSlug }).lean();

    if (!event) {
      return NextResponse.json(
        { message: `Event with slug ${sanitizedSlug} not found.` },
        { status: 404 },
      );
    }
    return NextResponse.json(
      { message: "Event Fetched Successfully", event },
      { status: 200 },
    );
  } catch (e) {
    if (process.env.NODE_ENV === "development") {
      console.error("Error fetching events by slug:", e);
    }

    if (e instanceof Error) {
      if (e.message.includes("MONGODB_URI")) {
        return NextResponse.json(
          { message: "Database configuration error" },
          { status: 500 },
        );
      }
      return NextResponse.json(
        { message: "Failed to fetch events", error: e.message },
        { status: 500 },
      );
    }
    
  }

  return NextResponse.json(
    { message: "An unexpected error occured" },
    { status: 500 },
  );
}
