import { LikeLogo, LikeOutline } from '@/assets/icons';
import MessageTeks from '@/assets/icons/message-text.svg';
import { EditThread } from '@/components/modal/edit-thread-modal';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { toaster } from '@/components/ui/toaster';
import { ThreadEntity } from '@/entities/thread-entity';
import { LikeResponse } from '@/features/like/dto/like-response';
import { api } from '@/libs/api';
import { useAuthStore } from '@/stores/auth';
import {
  CreateLikeSchemaDTO,
  DeleteLikeSchemaDTO,
} from '@/utils/schemas/like-schema';
import { Box, Flex, Image, Menu, Portal, Text } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { formatDistanceToNowStrict } from 'date-fns';
import { useState } from 'react';
import { FaEllipsisV } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { UseDeleteReply } from '../hooks/delete-reply';

export function CardThread(thread: ThreadEntity) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user } = useAuthStore();
  const [EditThreadModal, setEditThreadModal] = useState(false);

  function onClickCard() {
    navigate(`/detail/${thread.id}`);
  }

  const handleUserClick = (thread: ThreadEntity) => {
    navigate(`profile/${thread.userId}`);
  };

  const { isPending: isPendingUnlike, mutateAsync: mutateLike } = useMutation<
    LikeResponse,
    Error,
    CreateLikeSchemaDTO
  >({
    mutationKey: ['Likes'],
    mutationFn: async (data: CreateLikeSchemaDTO) => {
      const response = await api.post<LikeResponse>('/likes/thread', data);
      return response.data;
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        return toaster.create({
          title: error.response?.data.message,
          type: 'error',
        });
      }
      toaster.create({ title: `Something went wrong`, type: 'error' });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['threads'] });
    },
  });

  const { isPending: isPendingLike, mutateAsync: mutateUnlike } = useMutation<
    LikeResponse,
    Error,
    DeleteLikeSchemaDTO
  >({
    mutationKey: ['Unlike'],
    mutationFn: async (data: DeleteLikeSchemaDTO) => {
      const response = await api.delete<LikeResponse>(
        `/likes/thread/${data.threadId}`
      );
      return response.data;
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        return toaster.create({
          title: error.response?.data.message,
          type: 'error',
        });
      }
      toaster.create({ title: 'Something went wrong!', type: 'error' });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['threads'] });
    },
  });

  async function OnLike(data: CreateLikeSchemaDTO) {
    await mutateLike(data);
  }

  async function OnUnlike(data: DeleteLikeSchemaDTO) {
    await mutateUnlike(data);
  }

  const { DeleteThread } = UseDeleteReply();

  return (
    <Box
      display={'flex'}
      gap={'16px'}
      borderBottom={'1px solid'}
      borderColor={'outline'}
      padding={'16px 0'}
    >
      <Avatar
        onClick={() => handleUserClick(thread)}
        cursor={'pointer'}
        name={thread.user?.profile?.fullname}
        src={
          thread.user?.profile?.avatarUrl ||
          `https://api.dicebear.com/9.x/open-peeps/svg?seed=${thread.user?.profile?.fullname}`
        }
        shape="full"
        size="full"
        width={'50px'}
        height={'50px'}
      />

      <Box display={'flex'} flexDirection={'column'} gap={'4px'} width={'100%'}>
        <Flex justifyContent={'space-between'} alignItems={'center'}>
          <Flex gap={'4px'} alignItems={'center'}>
            <Text fontWeight={'bold'}>{thread.user?.profile?.fullname}</Text>
            <Text color={'secondary'}>@{thread.user?.username}</Text>
            <Text color={'secondary'}>•</Text>
            <Text color={'secondary'}>
              {formatDistanceToNowStrict(new Date(thread.createdAt))}
            </Text>
          </Flex>
          {user.id === thread.userId && (
            <Flex gap={'8px'}>
              <Menu.Root>
                <Menu.Trigger asChild>
                  <Button variant="outline" size="sm">
                    <FaEllipsisV color="white" />
                  </Button>
                </Menu.Trigger>
                <Portal>
                  <Menu.Positioner>
                    <Menu.Content>
                      <Menu.Item value="new-txt-a">
                        <Button
                          variant={'ghost'}
                          size={'sm'}
                          onClick={() => {
                            setEditThreadModal(true);
                          }}
                        >
                          Edit
                        </Button>
                      </Menu.Item>
                      <Menu.Item value="new-file-a">
                        <Button
                          onClick={() => DeleteThread({ id: thread.id })}
                          variant={'ghost'}
                          size={'sm'}
                        >
                          Delete
                        </Button>
                      </Menu.Item>
                    </Menu.Content>
                  </Menu.Positioner>
                </Portal>
              </Menu.Root>

              <EditThread
                isOpen={EditThreadModal}
                onClose={() => setEditThreadModal(false)}
                thread={thread}
              />
            </Flex>
          )}
        </Flex>

        <Text cursor={'pointer'} onClick={onClickCard}>
          {thread.content}
        </Text>

        {thread.images && (
          <Image
            onClick={onClickCard}
            src={thread.images}
            maxWidth={'100%'}
            maxHeight={'300px'}
            objectFit={'contain'}
            borderRadius={'8px'}
            marginTop={'8px'}
          />
        )}

        <Flex gap={'16px'} mt={'8px'}>
          <Button
            variant={'ghost'}
            display={'flex'}
            gap={'4px'}
            disabled={isPendingLike || isPendingUnlike}
            onClick={() =>
              thread.isLike
                ? OnUnlike({ threadId: thread.id })
                : OnLike({ threadId: thread.id })
            }
          >
            <Image src={thread.isLike ? LikeLogo : LikeOutline} />
            <Text>{thread.likesCount} Like</Text>
          </Button>
          <Button
            onClick={onClickCard}
            variant={'ghost'}
            display={'flex'}
            gap={'4px'}
          >
            <Image src={MessageTeks} />
            <Text>{thread.repliesCount} Replies</Text>
          </Button>
        </Flex>
      </Box>
    </Box>
  );
}
