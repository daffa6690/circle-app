import circlesvg from '@/assets/circle.svg';
import {
  Box,
  BoxProps,
  Button,
  Link as ChakraLink,
  Field,
  Image,
  Input,
  Text,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { UseResetPass } from '../hooks/use-reset';

export function ResetPassword(props: BoxProps) {
  const { OnSubmit, errors, handleSubmit, register } = UseResetPass();

  return (
    <Box display={'flex'} flexDirection={'column'} gap={'12px'} {...props}>
      <Image width="108px" src={circlesvg} />
      <Text fontSize={'28px'}>Forgot password</Text>
      <form
        onSubmit={handleSubmit(OnSubmit)}
        style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
      >
        <Field.Root invalid={!!errors['newpassword']?.message}>
          <Input
            placeholder="New Password *"
            type="password"
            {...register('newpassword')}
          />
          <Field.ErrorText>{errors['newpassword']?.message}</Field.ErrorText>
        </Field.Root>
        <Field.Root invalid={!!errors['confirmpassword']?.message}>
          <Input
            placeholder="Confirm Password*"
            type="password"
            {...register('confirmpassword')}
          />
          <Field.ErrorText>
            {errors['confirmpassword']?.message}
          </Field.ErrorText>
        </Field.Root>

        <Button backgroundColor={'brand.500'} color={'white'} type="submit">
          Create New Password
        </Button>
      </form>
      <Text as="span">
        {' '}
        Already have account?{' '}
        <ChakraLink color={'brand.500'} asChild>
          <Link to={'/login'}>Login</Link>
        </ChakraLink>
      </Text>
    </Box>
  );
}
