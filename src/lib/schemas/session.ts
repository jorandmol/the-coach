import { z } from "zod";

export const insertSchema = z.object({
  teamId: z.number(),
  teamName: z.string(),
  players: z.object({
    id: z.number(),
    name: z.string().min(1, { message: 'Name is required' }).max(50, { message: 'Name is too long' }),
    number: z.number().positive().min(1, { message: 'Number is required' }).max(99, { message: 'It must be a two digits number' }).default('' as unknown as number),
  }).array().min(1, { message: 'There must be at least one player in the session' })
})