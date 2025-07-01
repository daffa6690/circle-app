import { LikeLogo, LikeOutline } from '@/assets/icons';
import { Avatar } from '@/components/ui/avatar';
import { toaster } from '@/components/ui/toaster';
import { ReplyEntity } from '@/entities/reply-entity';
import { LikeResponse } from '@/features/like/dto/like-response';
import { api } from '@/libs/api';
import { useAuthStore } from '@/stores/auth';
import {
  CreateLikeSchemaDTO,
  DeleteLikeSchemaDTO,
} from '@/utils/schemas/like-schema';
import { Box, Button, Image, Text } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { formatDistanceToNowStrict } from 'date-fns';
import { UseDeleteReply } from '../hooks/delete-reply';

export function CardReply(reply: ReplyEntity) {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();

  const { DeleteReply } = UseDeleteReply();

  const { isPending: isPendingUnlike, mutateAsync: mutateLike } = useMutation<
    LikeResponse,
    Error,
    CreateLikeSchemaDTO
  >({
    mutationKey: ['Likes'],
    mutationFn: async (data: CreateLikeSchemaDTO) => {
      const response = await api.post<LikeResponse>(`/likes/reply`, data);

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
      await queryClient.invalidateQueries({
        queryKey: [`replies`],
      });
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
        `/likes/reply/${data.replyId}`
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
      toaster.create({ title: `Something went wrong`, type: 'error' });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [`replies`],
      });
    },
  });

  async function Like(data: CreateLikeSchemaDTO) {
    mutateLike(data);
  }

  async function Unlike(data: DeleteLikeSchemaDTO) {
    mutateUnlike(data);
  }

  return (
    <Box
      display={'flex'}
      gap={'16px'}
      borderBottom={'1px solid'}
      borderColor={'outline'}
      padding={'16px 0'}
    >
      <Avatar
        name={reply.user?.profile?.fullname}
        src={
          reply.user?.profile?.avatarUrl ||
          `https://api.dicebear.com/9.x/open-peeps/svg?seed=${reply.user?.profile?.fullname}`
        }
        shape="full"
        size="full"
        width={'50px'}
        height={'50px'}
      />

      <Box display={'flex'} flexDirection={'column'} gap={'4px'} width={'100%'}>
        <Box display={'flex'} justifyContent={'space-between'}>
          <Box display={'flex'} gap={'4px'}>
            <Text fontWeight={'bold'}>{reply.user?.profile?.fullname}</Text>
            <Text color={'secondary'}>@{reply.user?.username}</Text>
            <Text color={'secondary'}>•</Text>
            <Text color={'secondary'}>
              {formatDistanceToNowStrict(new Date(reply.createdAt))}
            </Text>
          </Box>
          <Box>
            {(user.id === reply.user?.id ||
              user.id === reply.thread?.userId) && (
              <Button
                onClick={() => DeleteReply({ id: reply.id })}
                variant={'ghost'}
                size={'sm'}
              >
                Delete
              </Button>
            )}
          </Box>
        </Box>

        <Text>{reply.content}</Text>
        <Box display={'flex'}>
          <Button
            variant={'ghost'}
            display={'flex'}
            gap={'4px'}
            disabled={isPendingLike || isPendingUnlike}
            onClick={() =>
              reply.isLike
                ? Unlike({ replyId: reply.id })
                : Like({ replyId: reply.id })
            }
          >
            <Image src={reply.isLike ? LikeLogo : LikeOutline} />
            <Text>{reply.likesCount ?? 0}</Text>
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
