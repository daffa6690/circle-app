import { toaster } from '@/components/ui/toaster';
import { api } from '@/libs/api';
import { ForgotPasswordSchemaDTO, forgotSchema } from '@/utils/schemas/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';

export function UseForgotPass() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordSchemaDTO>({
    mode: 'onChange',
    resolver: zodResolver(forgotSchema),
  });

  const { mutateAsync } = useMutation<
    { message: string },
    AxiosError,
    ForgotPasswordSchemaDTO
  >({
    mutationKey: ['forgot-password'],
    mutationFn: async ({ email }: ForgotPasswordSchemaDTO) => {
      const response = await api.post('/auth/forgot-password', { email });
      return response.data;
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        return toaster.create({
          title: (error.response?.data as { message: string }).message,
          type: 'error',
        });
      }
      toaster.create({
        title: `Something wrong`,
        type: 'error',
      });
    },
    onSuccess: (data) => {
      toaster.create({
        title: data.message,
        type: 'success',
      });
    },
  });

  async function OnSubmit(data: ForgotPasswordSchemaDTO) {
    await mutateAsync(data);
  }
  return {
    register,
    handleSubmit,
    errors,
    OnSubmit,
  };
}
