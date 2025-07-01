import {
  Input,
  Field,
  Image,
  Text,
  Box,
  Link as ChakraLink,
  Button,
  BoxProps,
} from '@chakra-ui/react';
import circlesvg from '@/assets/circle.svg';
import { Link } from 'react-router-dom';
import { UseRegister } from '../hooks/use-register';

export function RegisterForm(props: BoxProps) {
  const { OnSubmit, errors, handleSubmit, register } = UseRegister();
  return (
    <Box display={'flex'} flexDirection={'column'} gap={'12px'} {...props}>
      <Image width="108px" src={circlesvg} />
      <Text fontSize={'28px'}>Create account Circle</Text>
      <form
        onSubmit={handleSubmit(OnSubmit)}
        style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
      >
        <Field.Root invalid={!!errors['fullname']?.message}>
          <Input placeholder="fullname*" {...register('fullname')} />
          <Field.ErrorText>{errors['fullname']?.message}</Field.ErrorText>
        </Field.Root>
        <Field.Root invalid={!!errors['username']?.message}>
          <Input placeholder="username*" {...register('username')} />
          <Field.ErrorText>{errors['username']?.message}</Field.ErrorText>
        </Field.Root>
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

        <Button backgroundColor={'brand.500'} color={'white'} type="submit">
          Register
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
