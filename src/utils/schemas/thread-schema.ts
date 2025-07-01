import { z } from 'zod';

export const createThreadSchema = z.object({
  content: z.string().max(500),
  images: z.instanceof(FileList),
});

export type CreateThreadSchemaDTO = z.infer<typeof createThreadSchema>;

export const updateThreadSchema = z.object({
  content: z.string().max(500),
  images: z.instanceof(FileList),
});

export type UpdateThreadSchemaDTO = z.infer<typeof updateThreadSchema>;

export const deleteThreadSchema = z.object({
  id: z.string().uuid(),
});
export type DeleteThreadSchemaDTO = z.infer<typeof deleteThreadSchema>;
