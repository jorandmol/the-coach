import { z } from 'zod';

export const playerSchema = z.object({
  id: z.number().optional(),
  teamId: z.number(),
  name: z.string().min(1, { message: 'Name is required' }).max(50, { message: 'Name is too long' }),
  number: z.number().positive().min(1, { message: 'Number is required' }).max(99, { message: 'It must be a two digits number' }).default('' as unknown as number),
});