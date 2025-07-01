import { api } from '@/libs/api';
import { Box, Spinner, Text } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';

import { ThreadEntity } from '@/entities/thread-entity';
import { useParams } from 'react-router-dom';
import { CardMedia } from './card-media';

export function Media() {
  const { id } = useParams();

  const {
    data: threads,
    isLoading,
    isError,
    failureReason,
  } = useQuery<ThreadEntity[]>({
    queryKey: ['threads'],
    queryFn: async () => {
      const response = await api.get(`/threads/user/${id}`);
      return response.data;
    },
  });

  return (
    <Box>
      {isError && <Text color={'red'}>{failureReason?.message}</Text>}
      {isLoading ? (
        <Box display={'flex'} justifyContent={'center'} paddingY={50}>
          <Spinner />
        </Box>
      ) : (
        <Box>
          {threads?.map((thread) => <CardMedia {...thread} key={thread.id} />)}
        </Box>
      )}
    </Box>
  );
}
