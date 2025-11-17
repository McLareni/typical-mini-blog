import Form from "@/components/AddPostForm/AddPostForm";
import { PostDetailDTO } from "@/types/post";

const URL = process.env.NEXT_PUBLIC_URL;

type Props = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: Props) {
  const { id } = await params;
  const res = await fetch(`${URL}/api/posts/${id}`);

  if (!res.ok) {
    return <p>Post not found</p>;
  }

  const post: PostDetailDTO = await res.json();

  return <Form defaultvalues={post} />;
}
