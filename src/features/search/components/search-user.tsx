import { SearchOutline } from '@/assets/icons/index';
import { InputGroup } from '@/components/ui/input-group';
import { api } from '@/libs/api';
import { Box, Image, Input, Spinner } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { SearchUser } from '../type/search-user';
import { SearchUserCard } from './search-user-card';

export function SearchUsers() {
  const [searchText, setSearchText] = useState<string>('');
  const [searchTextDebounce] = useDebounce(searchText, 1000);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchText(e.target.value);
  }

  const {
    data: users,
    isLoading,
    refetch,
  } = useQuery<SearchUser[]>({
    queryKey: ['search-users'],
    queryFn: async () => {
      const response = await api.get(
        `/users/search?search=${searchTextDebounce}`
      );
      return response.data;
    },
  });

  useEffect(() => {
    refetch();
  }, [searchTextDebounce, refetch]);

  return (
    <Box>
      <InputGroup
        width={'100%'}
        startElement={<Image src={SearchOutline} width={'20px'} />}
      >
        <Input
          placeholder="Username"
          backgroundColor={'border'}
          borderRadius={'xl'}
          _focus={{ borderColor: 'brand.500' }}
          onChange={handleChange}
        />
      </InputGroup>

      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {users?.map((user) => (
            <SearchUserCard
              SearchUserData={user}
              isFollow={user.isFollow}
              id={user.id}
              key={user.id}
            />
          ))}
        </>
      )}
    </Box>
  );
}
