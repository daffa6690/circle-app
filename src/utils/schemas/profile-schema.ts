import { z } from 'zod';

export const updateProfileSchema = z.object({
  fullname: z.string(),
  username: z.string(),
  bio: z.string().max(500).optional(),
  avatarUrl: z.instanceof(FileList),
  bannerUrl: z.instanceof(FileList),
});

export type UpdateProfileSchemaDTO = z.infer<typeof updateProfileSchema>;
