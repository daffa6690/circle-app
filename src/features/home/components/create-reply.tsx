import { Avatar } from '@/components/ui/avatar';
import {
  DialogBackdrop,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { toaster } from '@/components/ui/toaster';
import { ReplyResponse } from '@/features/reply/dto/reply-response';
import { api } from '@/libs/api';
import { useAuthStore } from '@/stores/auth';
import {
  createReplySchema,
  CreateReplySchemaDTO,
} from '@/utils/schemas/reply-schema';
import { Box, Button, Field, Image, Text, Textarea } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

export default function CreateReply() {
  const { threadId } = useParams();
  const {
    user: {
      profile: { avatarUrl, fullname },
    },
  } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateReplySchemaDTO>({
    mode: 'onChange',
    resolver: zodResolver(createReplySchema),
  });

  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation<
    ReplyResponse,
    Error,
    CreateReplySchemaDTO
  >({
    mutationKey: ['create-reply'],
    mutationFn: async (data: CreateReplySchemaDTO) => {
      const response = await api.post<ReplyResponse>(
        `/replies/${threadId}`,
        data
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
        queryKey: [`replies`],
      });
      await queryClient.invalidateQueries({
        queryKey: [`threads/${threadId}`],
      });
      toaster.create({
        title: data.message,
        type: 'success',
      });
    },
  });

  async function onCreate(data: CreateReplySchemaDTO) {
    await mutateAsync(data);
    reset();

    setIsOpen(false);
  }

  return (
    <DialogRoot open={isOpen}>
      <Box
        display="flex"
        alignItems="center"
        gap="20px"
        borderBottom="1px solid"
        borderBottomColor="outline"
        padding="20px 0px"
        justifyContent="space-between"
      >
        <Box display="flex" alignItems="center" gap="20px">
          <Avatar
            name={fullname}
            src={
              avatarUrl ||
              `https://api.dicebear.com/9.x/open-peeps/svg?seed=${fullname}`
            }
            shape="full"
            size="full"
            width="50px"
            height="50px"
          />
          <DialogTrigger asChild>
            <Text
              fontSize="20px"
              color="secondary"
              onClick={() => setIsOpen(true)}
            >
              "Want to reply?"
            </Text>
          </DialogTrigger>
        </Box>
        <Box>
          <Button
            width="63px"
            color="white"
            borderRadius="50px"
            backgroundColor="brand.500"
            fontWeight="bold"
            disabled
          >
            Reply
          </Button>
        </Box>
      </Box>

      <DialogBackdrop />
      <DialogContent>
        <DialogCloseTrigger
          onClick={() => setIsOpen(false)}
        ></DialogCloseTrigger>

        <DialogHeader>
          <DialogTitle />
        </DialogHeader>

        <form onSubmit={handleSubmit(onCreate)}>
          <DialogBody>
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
                    placeholder="Want to reply?"
                    _placeholder={{ fontSize: '16px' }}
                    {...register('content')}
                  />
                  <Image
                    maxWidth={'300px'}
                    maxHeight={'300px'}
                    objectFit={'contain'}
                    paddingBottom={'10px'}
                  />
                </Box>
                <Field.ErrorText>{errors.content?.message}</Field.ErrorText>
              </Field.Root>
            </Box>
          </DialogBody>

          <DialogFooter display="flex" justifyContent="space-between">
            <Button
              width="63px"
              color="white"
              borderRadius="50px"
              backgroundColor="brand.500"
              fontWeight="bold"
              type="submit"
            >
              Reply
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </DialogRoot>
  );
}
