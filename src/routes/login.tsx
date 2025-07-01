import { LoginForm } from '@/features/auth/components/login-form';
import { Box } from '@chakra-ui/react';

export function LoginPage() {
  return (
    <Box display={'flex'} justifyContent={'center'} paddingTop={'128px'}>
      <LoginForm width={'412px'} />
    </Box>
  );
}
