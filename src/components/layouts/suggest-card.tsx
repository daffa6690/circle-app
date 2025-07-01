import { UserEntity } from '@/entities/user-entity';
import { UseFollow } from '@/features/follow/hooks/use-follow';
import { Box, Button, Text } from '@chakra-ui/react';
import { Avatar } from '../ui/avatar';

export function SuggestCard(suggest: UserEntity) {
  const { followedId, followingId, onFollow } = UseFollow(suggest);

  return (
    <Box
      display={'flex'}
      gap={'16px'}
      paddingBottom={'16px'}
      borderColor={'outline'}
      paddingX={'24px'}
    >
      <Avatar
        name={suggest.profile?.fullname}
        src={
          suggest.profile?.avatarUrl ??
          `https://api.dicebear.com/9.x/open-peeps/svg?seed=${suggest.profile?.fullname}`
        }
        shape="full"
        width={'45px'}
      />

      <Box display={'flex'} flexDirection={'column'} flex={'264'}>
        <Text fontWeight={'bold'}>{suggest.profile?.fullname}</Text>
        <Text color={'secondary'}>@{suggest.username}</Text>
      </Box>

      <Button
        flex={'99'}
        borderRadius={'full'}
        variant={'outline'}
        border={'1px solid white'}
        marginY={'auto'}
        onClick={() => onFollow({ followingId, followedId })}
      >
        Follow
      </Button>
    </Box>
  );
}
