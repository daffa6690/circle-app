import { z } from 'zod';

export const createReplySchema = z.object({
  content: z.string().max(500),
});

export type CreateReplySchemaDTO = z.infer<typeof createReplySchema>;
export const deleteReplySchema = z.object({
  id: z.string().uuid(),
});

export type DeleteReplySchemaDTO = z.infer<typeof deleteReplySchema>;
