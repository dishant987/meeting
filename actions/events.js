import { eventSchema } from "@/app/lib/validators";
import { db } from "@/lib/prisma";

const { auth } = require("@clerk/nextjs/dist/types/server");

export async function createEvent(data) {
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }
  const validatedData = eventSchema.parse(data);
  const user = await db.user.findUnique({
    where: {
      clerkUserId: userId,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }
  const event = await db.event.create({
    data: {
      ...validatedData,
      userId: user.id,
    },
  });
  return event;
}
