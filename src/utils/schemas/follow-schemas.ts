import { z } from 'zod';

export const createFollowSchema = z.object({
  followingId: z.string().uuid(),
  followedId: z.string().uuid(),
});

export type CreateFollowSchemaDTO = z.infer<typeof createFollowSchema>;
export const deleteFollowSchema = z.object({
  followingId: z.string().uuid(),
  followedId: z.string().uuid(),
});

export type DeleteFollowSchemaDTO = z.infer<typeof deleteFollowSchema>;
