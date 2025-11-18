import { PostDetailDTO } from "./post";

export type UserDTO = {
  id: number;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  Posts: PostDetailDTO[];
  accessToken?: string;
  refreshToken?: string;
};
