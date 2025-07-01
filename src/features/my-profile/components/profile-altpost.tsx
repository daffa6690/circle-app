import { api } from '@/libs/api';
import { Box, Spinner, Text } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';

import { ThreadEntity } from '@/entities/thread-entity';
import { CardThread } from '@/features/home/components/card-thread';
import { useParams } from 'react-router-dom';

export function AltPost() {
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
          {threads?.map((thread) => <CardThread {...thread} key={thread.id} />)}
        </Box>
      )}
    </Box>
  );
}
