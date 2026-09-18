"use server";

import connectDB from "../mongodb";
import { Event } from "@/database";

export async function getSimilarEventsBySlug(slug: string) {
  try {
    await connectDB();

    const event = await Event.findOne({ slug });
    if (!event) return [];
    const similarEvents = await Event.find({
      _id: { $ne: event._id },
      tags: { $in: event.tags },
    }).lean();

    return similarEvents.map((event) => ({
      ...event,
      _id: event._id.toString(),
    }));
  } catch {
    return [];
  }
}
