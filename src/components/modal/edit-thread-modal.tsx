import galleryAddLogo from '@/assets/icons/gallery-add.svg';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ThreadEntity } from '@/entities/thread-entity';
import { ThreadResponse } from '@/features/thread/dto/thread';
import { useAuthStore } from '@/stores/auth';
import {
  updateThreadSchema,
  UpdateThreadSchemaDTO,
} from '@/utils/schemas/thread-schema';
import {
  Box,
  CloseButton,
  Dialog,
  Field,
  Image,
  Input,
  Portal,
  Spinner,
  Textarea,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import { toaster } from '../ui/toaster';
import { api } from '@/libs/api';

type EditThreadsProps = {
  isOpen: boolean;
  onClose: () => void;
  thread: ThreadEntity;
};

export function EditThread({ isOpen, onClose, thread }: EditThreadsProps) {
  const queryClient = useQueryClient();

  const {
    user: {
      profile: { avatarUrl, fullname },
    },
  } = useAuthStore();
  const [preview, setPreview] = useState<string | null>(thread.images);
  const [content] = useState<string>(thread.content);
  const inputFileRef = useRef<HTMLInputElement | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateThreadSchemaDTO>({
    mode: 'onChange',
    resolver: zodResolver(updateThreadSchema),
  });

  const {
    ref: registerImagesRef,
    onChange: registerImageOnChange,
    ...resRegisterImages
  } = register('images');

  function onClickFile() {
    inputFileRef?.current?.click();
  }

  const { mutateAsync, isPending } = useMutation<
    ThreadResponse,
    Error,
    UpdateThreadSchemaDTO
  >({
    mutationKey: ['update-threads'],
    mutationFn: async (data: UpdateThreadSchemaDTO) => {
      const formData = new FormData();
      formData.append('content', data.content);
      formData.append('images', data.images[0]);

      const response = await api.patch<ThreadResponse>(
        `/threads/${thread.id}`,
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
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: ['threads'],
      });
      onClose();
      toaster.create({
        title: data.message,
        type: 'success',
      });
    },
  });

  async function onUpdate(data: UpdateThreadSchemaDTO) {
    await mutateAsync(data);
  }

  function HandlePreview(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  }

  return (
    <Dialog.Root open={isOpen}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.CloseTrigger asChild>
              <CloseButton
                width={'10px'}
                textAlign={'right'}
                size="sm"
                position="absolute"
                top="2"
                insetEnd="2"
                onClick={onClose}
              />
            </Dialog.CloseTrigger>
            <form onSubmit={handleSubmit(onUpdate)}>
              <Dialog.Body marginTop={'30px'}>
                <Box borderBottom="2px solid #1D1D1D" display="flex" gap="20px">
                  <Avatar
                    name={fullname}
                    src={
                      avatarUrl ||
                      `https://api.dicebear.com/9.x/open-peeps/svg?seed=${fullname}`
                    }
                    shape="full"
                    size="full"
                    width="40px"
                    height="40px"
                  />
                  <Field.Root invalid={!!errors.content?.message}>
                    <Box display={'flex'} flexDirection={'column'}>
                      <Textarea
                        resize="none"
                        border="none"
                        placeholder="What is happening?!"
                        _placeholder={{ fontSize: '16px' }}
                        {...register('content')}
                        defaultValue={content}
                      />
                      <Image
                        src={preview ?? ''}
                        maxWidth={'300px'}
                        maxHeight={'300px'}
                        objectFit={'contain'}
                        paddingBottom={'10px'}
                      />
                    </Box>
                    <Field.ErrorText>{errors.content?.message}</Field.ErrorText>
                  </Field.Root>
                </Box>
              </Dialog.Body>
              <Dialog.Footer>
                <Button variant="ghost" onClick={onClickFile}>
                  <Image src={galleryAddLogo} width="27px" />
                </Button>
                <Input
                  type="file"
                  onChange={(e) => {
                    HandlePreview(e);
                    registerImageOnChange(e);
                  }}
                  hidden
                  {...resRegisterImages}
                  ref={(e) => {
                    registerImagesRef(e);
                    inputFileRef.current = e;
                  }}
                />
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
