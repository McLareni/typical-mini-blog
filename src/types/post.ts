export type PostListDTO = {
  id: number;
  title: string;
  excerpt: string | null;
  tags: string[];
};

export type PostDetailDTO = {
  id: number;
  title: string;
  content: string | null;
  createdAt: Date;
  updatedAt: Date;
  tags?: string[];
  excerpt: string | null;
};
