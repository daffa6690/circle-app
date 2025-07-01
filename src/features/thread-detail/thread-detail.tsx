import { ThreadEntity } from '@/entities/thread-entity';
import { api } from '@/libs/api';
import { Box, Spinner } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { CardReply } from '../home/components/card-reply';
import { CardThreadDetail } from '../home/components/card-thread-detail';
import CreateReply from '../home/components/create-reply';
import { ReplyEntity } from '@/entities/reply-entity';

export function PostDetail() {
  const { threadId } = useParams();

  const { data: thread, isLoading } = useQuery<ThreadEntity>({
    queryKey: [`threads/${threadId}`],
    queryFn: async () => {
      const response = await api.get(`/threads/${threadId}`);
      return response.data;
    },
  });
  const { data: replies } = useQuery<ReplyEntity[]>({
    queryKey: [`replies`],
    queryFn: async () => {
      const response = await api.get(`/replies/${threadId}`);
      return response.data;
    },
  });

  return (
    <Box>
      {isLoading ? (
        <Box justifyContent={'center'} textAlign={'center'} paddingTop={'50px'}>
          <Spinner />
        </Box>
      ) : (
        <Box>
          {thread && (
            <>
              <CardThreadDetail {...thread} />
              <CreateReply />
              {thread.replies?.length ? (
                <>
                  {replies?.map((reply) => (
                    <CardReply {...reply} key={reply.id} />
                  ))}
                </>
              ) : undefined}
            </>
          )}
        </Box>
      )}
    </Box>
  );
}
