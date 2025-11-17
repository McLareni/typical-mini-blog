import Form from "@/components/AddPostForm/AddPostForm";
import PostsList from "@/components/PostsList/PostList";
import { PostListDTO } from "@/types/post";

const URL = process.env.NEXT_PUBLIC_URL;

export default async function Page() {
  const res = await fetch(URL + "/api/posts");
  const posts: PostListDTO[] = await res.json();

  return (
    <>
      <Form />
      <PostsList posts={posts} />
    </>
  );
}
