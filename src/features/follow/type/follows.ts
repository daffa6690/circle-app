import { ProfileEntity } from '@/entities/profile-entity';

export type FollowerEntity = {
  id: string;
  follower: {
    id: string;
    username: string;
    profile: ProfileEntity;
  };
  isFollow: boolean;
};
export type FollowingEntity = {
  id: string;
  following: {
    id: string;
    username: string;
    profile: ProfileEntity;
  };
  isFollow: boolean;
};
