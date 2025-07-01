export const IsLogin: boolean = false;

interface userSession {
  fullname: string;
  username: string;
  followersCount: number;
  followingsCount: number;
  avatarUrl: string;
  background: string;
  bio: string;
}

export const userSession: userSession = {
  fullname: 'M Daffa',
  username: 'daffa',
  followersCount: 2000,
  followingsCount: 100,
  avatarUrl:
    'https://api.dicebear.com/9.x/open-peeps/svg?seed=M%20Daffa',
  background: 'https://api.dicebear.com/9.x/glass/svg?seed=M%20Daffa',
  bio: "don't forget to touch the grass ",
};
