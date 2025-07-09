import { LeftArrow } from '@/assets/icons';
import { EditProfile } from '@/components/modal/edit-profile-modal';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { UserEntity } from '@/entities/user-entity';
import { UseFollow } from '@/features/follow/hooks/use-follow';
import { api } from '@/libs/api';
import { useAuthStore } from '@/stores/auth';
import { Box, Heading, Image, Text } from '@chakra-ui/react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { List } from './my-profile-list';

export function MyProfile() {
  const navigate = useNavigate();
  const { id } = useParams();

  const queryClient = useQueryClient();

  const { user: userLogin } = useAuthStore();

  const { data: userdata } = useQuery<UserEntity>({
    queryKey: ['user', id],
    queryFn: async () => {
      const response = await api.get(`/users/${id}`);
      return response.data;
    },
  });

  useEffect(() => {
    if (userdata) {
      queryClient.invalidateQueries({ queryKey: ['threads'] });
    }
  }, [userdata]);

  const { followedId, followingId, onFollow, unFollow } = UseFollow({
    id: userdata?.profile?.userId || '',
  });

  function onBack() {
    navigate('/');
  }

  const [EditProfileModal, setEditProfileModal] = useState(false);

  return (
    <Box>
      <Box display={'flex'} paddingTop={'20px'}>
        <Button
          onClick={onBack}
          variant={'ghost'}
          display={'flex'}
          gap={'4px'}
          color={'secondary'}
          position={'sticky'}
        >
          <Image src={LeftArrow} width={'27px'} />
        </Button>
        <Heading fontSize="28px">{userdata?.profile?.fullname}</Heading>
      </Box>

      <Box color="fg.muted">
        <Box
          backgroundSize={'cover'}
          backgroundImage={`url("${userdata?.profile?.bannerUrl}")`}
          width={'100%'}
          height={'140px'}
          borderRadius={'18px'}
        />
        <Box display={'flex'} justifyContent={'space-between'}> 
          <Avatar
            marginLeft={'24px'}
            border={'4px solid #1D1D1D'}
            marginTop={'-40px'}
            width={'80px'}
            height={'80px'}
            src={
              userdata?.profile?.avatarUrl ||
              `https://api.dicebear.com/9.x/open-peeps/svg?seed=${userdata?.profile?.fullname}`
            }
            shape="full"
            size="lg"
          />

          {userLogin.id === userdata?.profile?.userId ? (
            <Button
              width={'108px'}
              height={'33px'}
              borderRadius={'18px'}
              border={'1px solid white'}
              variant={'outline'}
              marginTop={'12px'}
              onClick={() => {
                setEditProfileModal(true);
              }}
            >
              Edit Profile
            </Button>
          ) : (
            <Button
              width={'108px'}
              height={'33px'}
              borderRadius={'18px'}
              border={'1px solid white'}
              variant={'outline'}
              marginTop={'12px'}
              onClick={() =>
                userdata?.isFollow
                  ? unFollow({ followingId, followedId })
                  : onFollow({ followingId, followedId })
              }
            >
              {userdata?.isFollow ? 'Unfollow' : 'Follow'}
            </Button>
          )}
          <EditProfile
            isOpen={EditProfileModal}
            onClose={() => setEditProfileModal(false)}
          />
        </Box>

        <Box display={'flex'} flexDirection={'column'} gap={'6px'}>
          <Text fontSize={'24px'} color={'white'} fontWeight={'700'}>
            {userdata?.profile?.fullname}
          </Text>
          <Text color={'secondary'} fontSize={'14px'}>
            @{userdata?.username}
          </Text>
          <Text color={'white'}>{userdata?.profile?.bio}</Text>
          <Box display={'flex'}>
            <Text
              marginRight={'4px'}
              as={'span'}
              fontWeight={'bold'}
              color={'white'}
            >
              {userdata?.followingsCount}
            </Text>
            <Text marginRight={'12px'}>Following</Text>

            <Text
              marginRight={'4px'}
              as={'span'}
              fontWeight={'bold'}
              color={'white'}
            >
              {userdata?.followersCount}
            </Text>
            <Text>Followers </Text>
          </Box>
        </Box>
      </Box>
      <Box padding={'12px'}>
        <List />
      </Box>
    </Box>
  );
}
