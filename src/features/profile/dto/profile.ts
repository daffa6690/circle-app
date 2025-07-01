export type ProfileResonse = {
  message: string;
  data: {
    id: string;
    fullname: string;
    username: string;
    bio: string;
    avatarUrl: string | null;
    bannerUrl: string | null;
    createdAt: string;
    updatedAt: string;
  };
};
