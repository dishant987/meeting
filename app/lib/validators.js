import { z } from "zod";

export const usernameSchema = z.object({
  username: z
    .string()
    .min(3)
    .max(20)
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores"
    ),
});

export const eventSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(3).max(500),
  duration: z.number().int().positive(),
  isPrivate: z.boolean(),
});
