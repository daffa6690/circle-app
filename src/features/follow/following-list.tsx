import { Avatar } from '@/components/ui/avatar';
import { Box, Button, Text } from '@chakra-ui/react';

import { UseFollow } from './hooks/use-follow';
import { FollowingEntity } from './type/follows';

export function Following({ following }: FollowingEntity) {
  const {
    followedId,
    followingId,
    isPendingFollow,
    isPendingUnfollow,
    unFollow,
  } = UseFollow(following);

  return (
    <Box
      display={'flex'}
      gap={'16px'}
      borderColor={'outline'}
      padding={'16px 0'}
    >
      <Avatar
        name={following.profile.fullname}
        src={
          following.profile.avatarUrl ||
          `https://api.dicebear.com/9.x/open-peeps/svg?seed=${following.profile.fullname}`
        }
        shape="full"
        size="full"
        width={'50px'}
        height={'50px'}
      />

      <Box display={'flex'} flexDirection={'column'} gap={'4px'} flex={'7'}>
        <Text fontWeight={'bold'}>{following.profile.fullname}</Text>
        <Text color={'secondary'}>@{following.username}</Text>

        <Text cursor={'pointer'}>{following.profile.bio}</Text>
      </Box>

      <Button
        flex={'1'}
        borderRadius={'full'}
        variant={'outline'}
        border={'1px solid white'}
        marginY={'auto'}
        disabled={isPendingFollow || isPendingUnfollow}
        onClick={() => unFollow({ followingId, followedId })}
      >
        Unfollow
      </Button>
    </Box>
  );
}
