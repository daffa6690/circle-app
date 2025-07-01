import { z } from 'zod';

export const createLikeSchema = z.object({
  threadId: z.string().uuid().optional(),
  replyId: z.string().uuid().optional(),
});

export type CreateLikeSchemaDTO = z.infer<typeof createLikeSchema>;

export const deleteLikeSchema = z.object({
  threadId: z.string().uuid().optional(),
  replyId: z.string().uuid().optional(),
});

export type DeleteLikeSchemaDTO = z.infer<typeof deleteLikeSchema>;
