export interface ProfileEntity {
  id: string;
  userId: string;
  fullname: string;
  avatarUrl: string | null;
  bannerUrl: string | null;
  bio: string | null;
  createdAt: string;
  updatedAt: string;
}
