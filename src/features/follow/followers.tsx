import { Tabs } from '@chakra-ui/react';

import { api } from '@/libs/api';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { Followers } from './follower-list';
import { Following } from './following-list';
import { FollowerEntity, FollowingEntity } from './type/follows';

import { useState } from 'react';

export function Follow() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('Following');
  const {
    data: follows,

    refetch: refetchFollower,
  } = useQuery<FollowerEntity[]>({
    queryKey: ['follower-users'],
    queryFn: async () => {
      const response = await api.get(`/follows/follower/${id}`);
      return response.data;
    },
    enabled: activeTab === 'Follower',
  });
  const {
    data: following,

    refetch: refetchFollowing,
  } = useQuery<FollowingEntity[]>({
    queryKey: ['following-users'],
    queryFn: async () => {
      const response = await api.get(`/follows/following/${id}`);
      return response.data;
    },
    enabled: activeTab === 'Following',
  });

  return (
    <Tabs.Root
      defaultValue="Following"
      onValueChange={(details) => {
        const tabValue = typeof details === 'string' ? details : details.value;
        setActiveTab(tabValue);

        if (tabValue === 'Following') {
          refetchFollowing();
        } else if (tabValue === 'Followers') {
          refetchFollower();
        }
      }}
    >
      <Tabs.List display={'flex'}>
        <Tabs.Trigger
          flex={'1'}
          fontSize={'16px'}
          justifyContent={'center'}
          value="Following"
        >
          Following
        </Tabs.Trigger>
        <Tabs.Trigger
          flex={'1'}
          fontSize={'16px'}
          justifyContent={'center'}
          value="Follower"
        >
          Followers
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="Following">
        {following?.map(({ id, following, isFollow }) => (
          <Following
            key={id}
            id={id}
            following={following}
            isFollow={isFollow}
          />
        ))}
      </Tabs.Content>
      <Tabs.Content value="Follower">
        {follows?.map(({ id, follower, isFollow }) => (
          <Followers key={id} id={id} follower={follower} isFollow={isFollow} />
        ))}
      </Tabs.Content>
    </Tabs.Root>
  );
}
