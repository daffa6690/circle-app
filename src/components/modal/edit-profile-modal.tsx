import { InputImage } from '@/assets/icons';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { toaster } from '@/components/ui/toaster';
import { UserEntity } from '@/entities/user-entity';
import { ProfileResonse } from '@/features/profile/dto/profile';
import { api } from '@/libs/api';
import { useAuthStore } from '@/stores/auth';
import {
  updateProfileSchema,
  UpdateProfileSchemaDTO,
} from '@/utils/schemas/profile-schema';
import {
  Box,
  CloseButton,
  Dialog,
  Image,
  Input,
  Portal,
  Spinner,
  Textarea,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

type EditProfileProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function EditProfile({ isOpen, onClose }: EditProfileProps) {
  const { user } = useAuthStore();

  const [previewAvatar, setPreviewAvatar] = useState<string | null | undefined>(
    user?.profile?.avatarUrl
  );
  const [previewBanner, setPreviewBanner] = useState<string | null | undefined>(
    user?.profile?.bannerUrl
  );
  const queryClient = useQueryClient();

  const inputAvatarRef = useRef<HTMLInputElement | null>(null);
  const inputBannerRef = useRef<HTMLInputElement | null>(null);

  const { data: userdata } = useQuery<UserEntity>({
    queryKey: ['user'],
    queryFn: async () => {
      const response = await api.get(`/users/${user.id}`);
      return response.data;
    },
  });

  useEffect(() => {
    if (userdata) {
      queryClient.invalidateQueries({ queryKey: ['threads'] });
    }
  }, [userdata]);

  const { register, handleSubmit } = useForm<UpdateProfileSchemaDTO>({
    mode: 'onChange',
    resolver: zodResolver(updateProfileSchema),
  });
  const {
    ref: registerAvatarRef,
    onChange: registerAvatarOnChange,
    ...resRegisterAvatar
  } = register('avatarUrl');
  const {
    ref: registerBannerRef,
    onChange: registerBannerOnChange,
    ...resRegisterBanner
  } = register('bannerUrl');

  function onClickBanner() {
    inputBannerRef?.current?.click();
  }
  function onClickAvatar() {
    inputAvatarRef?.current?.click();
  }

  const { mutateAsync, isPending } = useMutation<
    ProfileResonse,
    Error,
    UpdateProfileSchemaDTO
  >({
    mutationKey: ['update-profile'],
    mutationFn: async (data: UpdateProfileSchemaDTO) => {
      const formData = new FormData();
      formData.append('fullname', data.fullname);
      formData.append('username', data.username);
      formData.append('bio', data?.bio || '');
      formData.append('bannerUrl', data.bannerUrl[0]);
      formData.append('avatarUrl', data.avatarUrl[0]);

      const response = await api.patch<ProfileResonse>(
        `/users/profile/${user.id}`,
        formData
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
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['user'],
      });
      await queryClient.invalidateQueries({
        queryKey: ['check'],
      });
      onClose();
      toaster.create({
        title: 'Update success',
        type: 'success',
      });
    },
  });

  function HandlePreviewAvatar(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setPreviewAvatar(url);
    }
  }
  function HandlePreviewBanner(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setPreviewBanner(url);
    }
  }

  async function onUpdate(updateData: UpdateProfileSchemaDTO) {
    await mutateAsync(updateData);
  }

  return (
    <Dialog.Root open={isOpen}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Box
              display={'flex'}
              justifyContent={'space-between'}
              alignItems={'center'}
            >
              <Dialog.Header>
                <Dialog.Title width={'100px'}>Edit Profile</Dialog.Title>
              </Dialog.Header>
              <Dialog.CloseTrigger asChild>
                <CloseButton
                  onClick={onClose}
                  padding={'20px'}
                  textAlign={'right'}
                  size="xs"
                />
              </Dialog.CloseTrigger>
            </Box>
            <form onSubmit={handleSubmit(onUpdate)}>
              <Dialog.Body>
                <Box color="fg.muted">
                  <Box
                    position="relative"
                    backgroundSize="cover"
                    backgroundImage={`url("${previewBanner}")`}
                    width="100%"
                    height="140px"
                    borderRadius="18px"
                  >
                    <Button
                      onClick={onClickBanner}
                      variant="ghost"
                      position="absolute"
                      top="50%"
                      left="50%"
                      transform="translate(-50%, -50%)"
                      borderRadius="full"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      _hover={{ backgroundColor: 'transparent' }}
                    >
                      <Image src={InputImage} width={'60px'} />
                    </Button>
                    <Input
                      type="file"
                      onChange={(e) => {
                        HandlePreviewBanner(e);
                        registerBannerOnChange(e);
                      }}
                      hidden
                      {...resRegisterBanner}
                      ref={(e) => {
                        registerBannerRef(e);
                        inputBannerRef.current = e;
                      }}
                    />
                  </Box>

                  <Box position="relative" display="flex" marginTop="-40px">
                    <Box paddingLeft={'32px'} position="relative">
                      <Avatar
                        border="4px solid #1D1D1D"
                        width="80px"
                        height="80px"
                        src={previewAvatar ?? ''}
                        shape="full"
                        size="lg"
                      />

                      <Button
                        onClick={onClickAvatar}
                        variant="ghost"
                        marginTop={'20px'}
                        right={'50%'}
                        _hover={{ backgroundColor: 'transparent' }}
                      >
                        <Image src={InputImage} width="37px" />
                      </Button>
                      <Input
                        type="file"
                        onChange={(e) => {
                          HandlePreviewAvatar(e);
                          registerAvatarOnChange(e);
                        }}
                        hidden
                        {...resRegisterAvatar}
                        ref={(e) => {
                          registerAvatarRef(e);
                          inputAvatarRef.current = e;
                        }}
                      />
                    </Box>
                  </Box>
                </Box>
                <Box
                  gap={'12px'}
                  display={'flex'}
                  flexDirection={'column'}
                  marginTop={'20px'}
                >
                  <Input
                    placeholder="Name"
                    defaultValue={userdata?.profile?.fullname}
                    {...register('fullname')}
                  ></Input>

                  <Input
                    placeholder="Username"
                    defaultValue={userdata?.username}
                    {...register('username')}
                  ></Input>

                  <Textarea
                    placeholder="Bio"
                    defaultValue={userdata?.profile?.bio || ''}
                    {...register('bio')}
                  ></Textarea>
                </Box>
              </Dialog.Body>
              <Dialog.Footer>
                <Button
                  width="63px"
                  color="white"
                  borderRadius="50px"
                  backgroundColor="brand.500"
                  fontWeight="bold"
                  type="submit"
                  loading={isPending}
                >
                  {isPending ? <Spinner /> : 'Save'}
                </Button>
              </Dialog.Footer>
            </form>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
