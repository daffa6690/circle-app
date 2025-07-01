import { toaster } from '@/components/ui/toaster';
import { api } from '@/libs/api';
import { ResetPasswordSchemaDTO, resetSchema } from '@/utils/schemas/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';

interface ResetPasswordResponse {
  message: string;
  data: {
    id: string;
    email: string;
    updatedAt: string;
  };
}

export function UseResetPass() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordSchemaDTO>({
    mode: 'all',
    resolver: zodResolver(resetSchema),
  });
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const { mutateAsync } = useMutation<
    ResetPasswordResponse,
    Error,
    ResetPasswordSchemaDTO
  >({
    mutationKey: ['reset-password'],
    mutationFn: async ({
      confirmpassword,
      newpassword,
    }: ResetPasswordSchemaDTO) => {
      const response = await api.post<ResetPasswordResponse>(
        '/auth/reset-password',
        { confirmpassword, newpassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        return toaster.create({
          title: error.response?.data.message,
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
      navigate({ pathname: '/login' });
    },
  });
  async function OnSubmit(data: ResetPasswordSchemaDTO) {
    await mutateAsync(data);
  }
  return {
    register,
    handleSubmit,
    errors,
    OnSubmit,
  };
}
