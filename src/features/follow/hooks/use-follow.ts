import { toaster } from '@/components/ui/toaster';
import { api } from '@/libs/api';
import { useAuthStore } from '@/stores/auth';
import {
  CreateFollowSchemaDTO,
  DeleteFollowSchemaDTO,
} from '@/utils/schemas/follow-schemas';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { FollowResponse } from '../type/follow-response';
import { useParams } from 'react-router-dom';

export function UseFollow(follower: { id: string }) {
  const { user } = useAuthStore();
  const { id } = useParams();
  const followingId = follower.id;
  const followedId = user.id;

  const queryClient = useQueryClient();

  const { isPending: isPendingUnfollow, mutateAsync: mutateFollow } =
    useMutation<FollowResponse, Error, CreateFollowSchemaDTO>({
      mutationKey: ['Follows'],
      mutationFn: async (data: CreateFollowSchemaDTO) => {
        const response = await api.post<FollowResponse>('/follows', data);
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
        await queryClient.invalidateQueries({ queryKey: ['follower-users'] });
        await queryClient.invalidateQueries({ queryKey: ['following-users'] });
        await queryClient.invalidateQueries({ queryKey: ['suggest-users'] });
        await queryClient.invalidateQueries({ queryKey: ['user', id] });
        await queryClient.invalidateQueries({ queryKey: [`search-users`] });
        setTimeout(
          () => queryClient.invalidateQueries({ queryKey: ['suggest-users'] }),
          2000
        );
      },
    });
  async function onFollow(data: CreateFollowSchemaDTO) {
    await mutateFollow(data);
  }

  const { isPending: isPendingFollow, mutateAsync: mutateUnFollow } =
    useMutation<FollowResponse, Error, DeleteFollowSchemaDTO>({
      mutationKey: ['UnFollows'],
      mutationFn: async (data: DeleteFollowSchemaDTO) => {
        const response = await api.delete(
          `/follows/${followedId}/${followingId}`,
          { data }
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
        await queryClient.invalidateQueries({ queryKey: ['follower-users'] });
        await queryClient.invalidateQueries({ queryKey: ['following-users'] });
        await queryClient.invalidateQueries({ queryKey: ['user', id] });
        await queryClient.invalidateQueries({ queryKey: [`search-users`] });
        setTimeout(
          () => queryClient.invalidateQueries({ queryKey: ['suggest-users'] }),
          2000
        );
      },
    });

  async function unFollow(data: DeleteFollowSchemaDTO) {
    await mutateUnFollow(data);
  }
  return {
    onFollow,
    isPendingUnfollow,
    unFollow,
    isPendingFollow,
    followingId,
    followedId,
  };
}
