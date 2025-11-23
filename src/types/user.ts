import { PostDetailDTO } from "./post";

export type UserDTO = {
  id: number;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  posts: PostDetailDTO[];
  accessToken?: string;
  refreshToken?: string;
};
