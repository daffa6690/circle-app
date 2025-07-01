import { ProfileEntity } from './profile-entity';

export interface UserEntity {
  id: string;
  email: string;
  username: string;
  password: string;
  profile?: ProfileEntity;
  _count?: {
    followings: number;
  };
  followersCount: number;
  followingsCount: number;
  isFollow: boolean;
  createdAt: string;
  updatedAt: string;
}
