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
import { UseLoginForm } from '../hooks/use-login';

export function LoginForm(props: BoxProps) {
  const { OnSubmit, errors, handleSubmit, register } = UseLoginForm();

  return (
    <Box display={'flex'} flexDirection={'column'} gap={'12px'} {...props}>
      <Image width="108px" src={circlesvg} />
      <Text fontSize={'28px'}>Login to Circle</Text>
      <form
        onSubmit={handleSubmit(OnSubmit)}
        style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
      >
        <Field.Root invalid={!!errors['email']?.message}>
          <Input placeholder="Email*" {...register('email')} />
          <Field.ErrorText>{errors['email']?.message}</Field.ErrorText>
        </Field.Root>

        <Field.Root invalid={!!errors['password']?.message}>
          <Input
            placeholder="Password*"
            type="password"
            {...register('password')}
          />
          <Field.ErrorText>{errors['password']?.message}</Field.ErrorText>
        </Field.Root>
        <Text textAlign={'end'} as="span">
          <ChakraLink asChild>
            <Link to={'/forgot-password'}>Forgot password?</Link>
          </ChakraLink>
        </Text>
        <Button backgroundColor={'brand.500'} color={'white'} type="submit">
          Login
        </Button>
      </form>
      <Text as="span">
        {' '}
        Don't have an account yet?{' '}
        <ChakraLink color={'brand.500'} asChild>
          <Link to={'/register'}>Create account?</Link>
        </ChakraLink>
      </Text>
    </Box>
  );
}
