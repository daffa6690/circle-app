import { toaster } from '@/components/ui/toaster';
import { ReplyResponse } from '@/features/reply/dto/reply-response';
import { ThreadResponse } from '@/features/thread/dto/thread';
import { api } from '@/libs/api';
import { DeleteReplySchemaDTO } from '@/utils/schemas/reply-schema';
import { DeleteThreadSchemaDTO } from '@/utils/schemas/thread-schema';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export function UseDeleteReply() {
  const queryClient = useQueryClient();

  const { mutateAsync: mutateDelete } = useMutation<
    ReplyResponse,
    Error,
    DeleteReplySchemaDTO
  >({
    mutationKey: ['delete-reply'],
    mutationFn: async (data: DeleteReplySchemaDTO) => {
      const response = await api.delete(`/replies/${data.id}`);
      return response.data;
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        return toaster.create({
          title: error.response?.data.message,
          type: 'error',
        });
      }
      toaster.create({ title: 'Something wrong', type: 'error' });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['replies'] });
      toaster.create({
        title: 'delete success',
        type: 'success',
      });
    },
  });

  async function DeleteReply(data: DeleteReplySchemaDTO) {
    await mutateDelete(data);
  }

  const { mutateAsync: mutateDeleteThread } = useMutation<
    ThreadResponse,
    Error,
    DeleteThreadSchemaDTO
  >({
    mutationKey: ['deleteThread'],
    mutationFn: async (data: DeleteThreadSchemaDTO) => {
      const response = await api.delete<ThreadResponse>(`/threads/${data.id}`);
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
      toaster.create({ title: 'Thread deleted', type: 'success' });
      await queryClient.invalidateQueries({ queryKey: ['threads'] });
    },
  });

  async function DeleteThread(data: DeleteThreadSchemaDTO) {
    await mutateDeleteThread(data);
  }

  return {
    DeleteReply,
    DeleteThread,
  };
}
