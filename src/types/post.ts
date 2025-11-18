export type PostAuthorDTO = {
  id: number;
  email: string;
  name: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type PostListDTO = {
  id: number;
  title: string;
  excerpt: string | null;
  tags: string[];
  author: PostAuthorDTO;
};

export type PostDetailDTO = {
  id: number;
  title: string;
  content: string | null;
  createdAt: Date;
  updatedAt: Date;
  tags?: string[];
  excerpt: string | null;
  authorId: number;
  author: PostAuthorDTO;
};
