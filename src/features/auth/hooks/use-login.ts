import { toaster } from '@/components/ui/toaster';
import { ProfileEntity } from '@/entities/profile-entity';
import { UserEntity } from '@/entities/user-entity';
import { api } from '@/libs/api';
import { useAuthStore } from '@/stores/auth';
import { loginSchema, LoginSchemaDTO } from '@/utils/schemas/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

type UserProfile = UserEntity & {
  profile: ProfileEntity;
};

interface LoginResponse {
  message: string;
  data: {
    token: string;
    user: UserProfile;
  };
}

export function UseLoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaDTO>({
    mode: 'onChange',
    resolver: zodResolver(loginSchema),
  });
  const navigate = useNavigate();

  const { setUser } = useAuthStore();

  const { mutateAsync } = useMutation<LoginResponse, Error, LoginSchemaDTO>({
    mutationKey: ['login'],
    mutationFn: async (data: LoginSchemaDTO) => {
      const response = await api.post<LoginResponse>('/auth/login', data);

      Cookies.set('token', response.data.data.token, {
        expires: 1,
      });
      setUser(response.data.data.user);
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

      navigate({ pathname: '/' });
    },
  });

  async function OnSubmit(data: LoginSchemaDTO) {
    await mutateAsync(data);
  }
  return {
    register,
    handleSubmit,
    errors,
    OnSubmit,
  };
}
