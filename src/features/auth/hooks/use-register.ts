import { useForm } from 'react-hook-form';
import { registerSchema, RegisterSchemaDTO } from '@/utils/schemas/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { toaster } from '@/components/ui/toaster';
import { useNavigate } from 'react-router-dom';

import { api } from '@/libs/api';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';

interface RegisterResponse {
  message: string;
  data: {
    id: string;
    fullName: string;
    email: string;
    createdAt: string;
    updatedAt: string;
  };
}
export function UseRegister() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchemaDTO>({
    mode: 'onChange',
    resolver: zodResolver(registerSchema),
  });

  const navigate = useNavigate();

  const { mutateAsync } = useMutation<
    RegisterResponse,
    Error,
    RegisterSchemaDTO
  >({
    mutationKey: ['register'],
    mutationFn: async (data: RegisterSchemaDTO) => {
      const response = await api.post<RegisterResponse>('/auth/register', data);
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

  async function OnSubmit(data: RegisterSchemaDTO) {
    await mutateAsync(data);
  }
  return {
    register,
    handleSubmit,
    errors,
    OnSubmit,
  };
}
