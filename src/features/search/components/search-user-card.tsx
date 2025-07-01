import { Avatar } from '@/components/ui/avatar';
import { UseFollow } from '@/features/follow/hooks/use-follow';
import { Box, BoxProps, Button, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { SearchUser } from '../type/search-user';

interface SearchUserCardProps extends BoxProps {
  SearchUserData: SearchUser;
  isFollow: boolean;
}

export function SearchUserCard({
  isFollow,
  SearchUserData,
  ...props
}: SearchUserCardProps) {
  const navigate = useNavigate();
  const handleUserClick = (user: SearchUser) => {
    navigate(`/profile/${user.id}`);
  };
  const { followedId, followingId, onFollow, unFollow } =
    UseFollow(SearchUserData);

  return (
    <Box
      display={'flex'}
      gap={'16px'}
      borderColor={'outline'}
      padding={'16px 0'}
      {...props}
    >
      <Avatar
        onClick={() => handleUserClick(SearchUserData)}
        name={SearchUserData.profile.fullname}
        src={
          SearchUserData.profile.avatarUrl ??
          `https://api.dicebear.com/9.x/open-peeps/svg?seed=${SearchUserData.profile.fullname}`
        }
        shape="full"
        size="full"
        width={'50px'}
        height={'50px'}
      />

      <Box display={'flex'} flexDirection={'column'} gap={'4px'} flex={'7'}>
        <Text fontWeight={'bold'}>{SearchUserData.profile.fullname}</Text>
        <Text color={'secondary'}>@{SearchUserData.username}</Text>

        <Text cursor={'pointer'}>{SearchUserData.profile.bio}</Text>
      </Box>

      <Button
        flex={'1'}
        borderRadius={'full'}
        variant={'outline'}
        border={'1px solid white'}
        onClick={() => {
          if (isFollow) {
            unFollow({ followingId, followedId });
          } else {
            onFollow({ followingId, followedId });
          }
        }}
      >
        {isFollow ? 'Unfollow' : 'Follow'}
      </Button>
    </Box>
  );
}
