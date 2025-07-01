import { Tabs } from '@chakra-ui/react';
import { AltPost } from './profile-altpost';
import { Media } from './profile-media';

export function List() {
  return (
    <Tabs.Root defaultValue="members">
      <Tabs.List display={'flex'}>
        <Tabs.Trigger
          flex={'1'}
          fontSize={'16px'}
          justifyContent={'center'}
          value="members"
        >
          All Post
        </Tabs.Trigger>
        <Tabs.Trigger
          flex={'1'}
          fontSize={'16px'}
          justifyContent={'center'}
          value="projects"
        >
          Media
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="members">
        <AltPost />
      </Tabs.Content>
      <Tabs.Content value="projects">
        <Media />
      </Tabs.Content>
    </Tabs.Root>
  );
}
