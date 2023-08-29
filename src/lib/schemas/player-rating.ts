import { z } from "zod";

export const editSchema = z.object({
  ratingId: z.number(),
  rate: z.number().min(1).max(5).optional()
})