import { MyProfile } from '@/features/my-profile/components/my-profile';
import { Box } from '@chakra-ui/react';
export function ProfilePage() {
  return (
    <Box className="fixed inset-0">
      <MyProfile />
    </Box>
  );
}
