export type UserPost = {
  fullname: string;
  username: string;
  avatarUrl: string;
};

export type Reply = {
  id: string;
  user: UserPost;
  content: string;
  likesCount: number;
  createdAt: Date;
};

export type Post = {
  id: string;
  images: string;
  user: UserPost;
  content: string;
  likesCount: number;
  repliesCount: number;
  replies?: Reply[];
  isLike: boolean;
  createdAt: Date;
};
