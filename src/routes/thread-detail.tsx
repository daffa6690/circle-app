import { Box, Image, Text } from '@chakra-ui/react';

import { PostDetail } from '@/features/thread-detail/thread-detail';
import arrowLeft from '@/assets/icons/Line arrow-left.svg';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function ThreadDetailPage() {
  const navigate = useNavigate();

  function onBack() {
    navigate('/');
  }

  return (
    <Box paddingTop={'20px'}>
      <Box display={'flex'} gap={'10px'} alignItems={'center'}>
        <Button
          onClick={onBack}
          variant={'ghost'}
          display={'flex'}
          gap={'4px'}
          color={'secondary'}
        >
          <Image src={arrowLeft} width={'27px'} />
        </Button>
        <Text fontSize={'2xl'}>Status</Text>
      </Box>
      <PostDetail />
    </Box>
  );
}
