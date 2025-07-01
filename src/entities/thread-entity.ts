import { LikeEntity } from './like-entity';
import { ReplyEntity } from './reply-entity';
import { UserEntity } from './user-entity';

export interface ThreadEntity {
  id: string;
  userId: string;
  content: string;
  images: string;
  user?: UserEntity;
  likes?: LikeEntity[];
  replies?: ReplyEntity[];
  likesCount: number;
  repliesCount: number;
  isLike: boolean;
  createdAt: string;
  updatedAt: string;
}
