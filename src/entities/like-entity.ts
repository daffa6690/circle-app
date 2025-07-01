import { ReplyEntity } from './reply-entity';
import { ThreadEntity } from './thread-entity';
import { UserEntity } from './user-entity';

export interface LikeEntity {
  id: string;
  content?: string;
  thread?: ThreadEntity;
  reply?: ReplyEntity;
  user?: UserEntity;
  createdAt: string;
  updatedAt: string;
}
