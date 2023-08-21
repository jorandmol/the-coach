import { z } from 'zod';

export const insertSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }).max(50, { message: 'Name is too long' })
});

export const editSchema = z.object({
  id: z.number(),
  name: z.string().min(1, { message: 'Name is required' }).max(50, { message: 'Name is too long' }),
  description: z.string().max(255, { message: 'Description is too long' }).optional()
});

export const deleteSchema = z.object({
  id: z.number()
});