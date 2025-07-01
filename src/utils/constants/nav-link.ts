import {
  HeartLogo,
  HeartOutline,
  HomeLogo,
  HomeOutline,
  ProfileLogo,
  ProfileOutline,
  SearchLogo,
  SearchOutline,
} from '@/assets/icons';
import { useAuthStore } from '@/stores/auth';

interface NavLinkMenu {
  label: string;
  path: string;
  logo: {
    full: string;
    outline: string;
  };
}
export const NAV_LINK_MENU = (): NavLinkMenu[] => {
  const { user } = useAuthStore();

  return [
    {
      label: 'Home',
      logo: {
        full: HomeLogo,
        outline: HomeOutline,
      },
      path: '/',
    },
    {
      label: 'Search',
      logo: {
        full: SearchLogo,
        outline: SearchOutline,
      },
      path: '/search',
    },
    {
      label: 'Follows',
      logo: {
        full: HeartLogo,
        outline: HeartOutline,
      },
      path: `/follows/${user.id}`,
    },
    {
      label: 'Profile',
      logo: {
        full: ProfileLogo,
        outline: ProfileOutline,
      },
      path: `/profile/${user.id}`,
    },
  ];
};
