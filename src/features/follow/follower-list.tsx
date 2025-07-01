import { Avatar } from '@/components/ui/avatar';
import { Box, Button, Text } from '@chakra-ui/react';
import { UseFollow } from './hooks/use-follow';
import { FollowerEntity } from './type/follows';

export function Followers({ follower, isFollow }: FollowerEntity) {
  const {
    isPendingUnfollow,
    onFollow,
    followedId,
    followingId,
    isPendingFollow,
    unFollow,
  } = UseFollow(follower);

  return (
    <Box
      display={'flex'}
      gap={'16px'}
      borderColor={'outline'}
      padding={'16px 0'}
    >
      <Avatar
        name={follower.profile.fullname}
        src={
          follower.profile.avatarUrl ||
          `https://api.dicebear.com/9.x/open-peeps/svg?seed=${follower.profile.fullname}`
        }
        shape="full"
        size="full"
        width={'50px'}
        height={'50px'}
      />

      <Box display={'flex'} flexDirection={'column'} gap={'4px'} flex={'7'}>
        <Text fontWeight={'bold'}>{follower.profile.fullname}</Text>
        <Text color={'secondary'}>@{follower.username}</Text>

        <Text cursor={'pointer'}>{follower.profile.bio}</Text>
      </Box>

      <Button
        flex={'1'}
        borderRadius={'full'}
        variant={'outline'}
        border={'1px solid white'}
        marginY={'auto'}
        disabled={isPendingFollow || isPendingUnfollow}
        onClick={() =>
          isFollow
            ? unFollow({ followingId, followedId })
            : onFollow({ followingId, followedId })
        }
      >
        {isFollow ? 'Unfollow' : 'Follow'}
      </Button>
    </Box>
  );
}
