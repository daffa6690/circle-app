import galleryAddLogo from '@/assets/icons/gallery-add.svg';
import CreateThreadModal from '@/components/modal/create-threads-modal';

import { Avatar } from '@/components/ui/avatar';
import { useAuthStore } from '@/stores/auth';
import { Box, Button, Image, Text } from '@chakra-ui/react';
import { useState } from 'react';

export default function CreateThread() {
  const {
    user: {
      profile: { avatarUrl, fullname },
    },
  } = useAuthStore();

  const [ThreadModal, setThreadModal] = useState(false);

  return (
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
        <Text
          fontSize="20px"
          color="secondary"
          onClick={() => setThreadModal(true)}
        >
          "What is happening?!"
        </Text>
        <CreateThreadModal
          isOpen={ThreadModal}
          onClose={() => setThreadModal(false)}
        />
      </Box>
      <Box>
        <Button variant="ghost" disabled cursor="disabled">
          <Image src={galleryAddLogo} width="27px" />
        </Button>

        <Button
          width="63px"
          color="white"
          borderRadius="50px"
          backgroundColor="brand.500"
          fontWeight="bold"
          disabled
        >
          Post
        </Button>
      </Box>
    </Box>
  );
}
