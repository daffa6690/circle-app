import { ThreadEntity } from '@/entities/thread-entity';
import { Box, Image } from '@chakra-ui/react';

export function CardMedia(thread: ThreadEntity) {
  return (
    <Box
      display={'flex'}
      gap={'16px'}
      borderColor={'outline'}
      padding={'16px 0'}
      width={'100%'}
    >
      {thread.images && (
        <Image
          src={thread.images}
          maxWidth={'100%'}
          objectFit={'contain'}
          borderRadius={'8px'}
          mt={'8px'}
        />
      )}
    </Box>
  );
}
