import {
  DumbWays,
  Facebook,
  Github,
  Instagram,
  Linkedin,
} from '@/assets/icons';
import { Box, Link as ChakraLink, Image, Text } from '@chakra-ui/react';

export function Footer() {
  return (
    <Box
      padding={'12px 16px'}
      gap={'10px'}
      display={'flex'}
      flexDirection={'column'}
    >
      <Box display={'flex'}>
        <Text>
          Develop By{' '}
          <Text as="span" fontWeight={'700'}>
            M Daffa
          </Text>{' '}
          •&nbsp;
        </Text>
        <Box display={'flex'} gap={'8px'}>
          <ChakraLink>
            <Image src={Github} />
          </ChakraLink>
          <ChakraLink>
            <Image src={Linkedin} />
          </ChakraLink>
          <ChakraLink>
            <Image src={Facebook} />
          </ChakraLink>
          <ChakraLink>
            <Image src={Instagram} />
          </ChakraLink>
        </Box>
      </Box>
      <Box
        fontSize={'14px'}
        display={'flex'}
        alignItems={'center'}
        color={'footer'}
        gap={2}
      >
        <Text>Powered By</Text>
        <Image height={'16px'} src={DumbWays} />
        <Text>Dumways Indonesia • #1 Coding Bootcamp</Text>
      </Box>
    </Box>
  );
}
