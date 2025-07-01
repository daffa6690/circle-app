import { LikeEntity } from './like-entity';
import { ThreadEntity } from './thread-entity';
import { UserEntity } from './user-entity';

export interface ReplyEntity {
  id: string;
  content: string;
  thread?: ThreadEntity;
  threadId: string;
  likes: LikeEntity[];
  likesCount: number;
  isLike: boolean;
  user?: UserEntity;
  createdAt: string;
  updatedAt: string;
}
