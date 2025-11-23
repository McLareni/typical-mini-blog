import { PostListDTO } from "@/types/post";

import PostCard from "../PostCard/PostCard";

import styles from "./PostListProfile.module.css";

interface IProps {
  posts: PostListDTO[];
}

export default function PostListProfile({ posts }: IProps) {
  return (
    <ul className={styles.list}>
      {posts.map((post) => (
        <li key={post.id}>
          <PostCard post={post} />
        </li>
      ))}
    </ul>
  );
}
