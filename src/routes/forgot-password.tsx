import { ForgotPassword } from '@/features/auth/components/forgot-form';
import { Box } from '@chakra-ui/react';

export function ForgotPage() {
  return (
    <Box display={'flex'} justifyContent={'center'} paddingTop={'128px'}>
      <ForgotPassword width={'412px'} />
    </Box>
  );
}
