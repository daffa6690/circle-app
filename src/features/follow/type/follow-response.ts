export type FollowResponse = {
  message: string;
  data: {
    id: string;
    userId: string;
    followingId: string;
    followedId: string;
    createdAt: string;
    updatedAt: string;
  };
};
