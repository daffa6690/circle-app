export type ThreadResponse = {
  message: string;
  data: {
    id: string;
    content: string;
    imageUrl: string | null;
    createdAt: string;
    updatedAt: string;
  };
};
