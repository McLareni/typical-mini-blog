import PostActions from "@/components/PostActions/PostActions";
import FormTag from "@/components/UI/FormTag/FormTag";
import { PostDetailDTO } from "@/types/post";

import styles from "./page.module.css";

const URL = process.env.NEXT_PUBLIC_URL;

interface IProps {
  params: Promise<{ id: string }>;
}

export default async function PostPage({ params }: IProps) {
  const { id } = await params;
  console.log(id);

  const res = await fetch(`${URL}/api/posts/${id}`);

  if (!res.ok) {
    return <p>Post not found</p>;
  }

  const { title, content, tags, updatedAt } =
    (await res.json()) as PostDetailDTO;
  const formattedDate = `${updatedAt.toString().slice(0, 10)} - ${updatedAt
    .toString()
    .slice(11, 16)}`;

  return (
    <div className={styles.post}>
      <div className={styles.title}>
        <h2>Title: </h2>
        <h1>{title}</h1>
      </div>
      <p>Content: {content}</p>
      <div className={styles.tags}>
        {tags?.map((tag) => (
          <FormTag key={tag} tag={tag} active />
        ))}
      </div>
      {updatedAt && <p className={styles.date}>Date: {formattedDate}</p>}

      {/* client side */}
      <PostActions />
    </div>
  );
}
