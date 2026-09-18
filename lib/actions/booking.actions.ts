"use server";

import { Booking } from "@/database";
import connectDB from "../mongodb";

export const createBooking = async ({
  email,
  slug,
  eventId,
}: {
  email: string;
  slug: string;
  eventId: string;
}) => {
  try {
    await connectDB();
    await Booking.create({ email, slug, eventId });
    return { success: true };
  } catch (e) {
    console.error("Booking createion failed", e);
    return { success: false };
  }
};
