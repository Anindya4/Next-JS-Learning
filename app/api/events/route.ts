import  Event  from "@/database/event.model";
import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDB(); //connect with mongodb (s-1)

    const formdata = await req.formData(); // fetching details

    let event;
    try {
      event = Object.fromEntries(formdata.entries());
    } catch (e) {
      return NextResponse.json(
        { message: "Unknow JSON format data" },
        { status: 400 },
      );
    }

    const createEvent = await Event.create(event);

    return NextResponse.json(
      {
        message: "Event created successfully",
        event: createEvent,
      },
      { status: 201 },
    );
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      {
        message: "Event creation failed",
        error: e instanceof Error ? e.message : "Unkown",
      },
      { status: 500 },
    );
  }
}
