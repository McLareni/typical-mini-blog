import Link from "next/link";

import { PostListDTO } from "@/types/post";

import FormTag from "../UI/FormTag/FormTag";

import styles from "./PostCard.module.css";

export default function PostCard({ post }: { post: PostListDTO }) {
  return (
    <div key={post.id} className={styles.post}>
      <Link href={`/post/${post.id}`}>
        <h1>{post.title}</h1>
        <p>{post.excerpt}</p>
        <div className={styles.tags}>
          {post.tags &&
            post.tags.map((tag) => <FormTag key={tag} tag={tag} active />)}
        </div>
      </Link>
    </div>
  );
}
