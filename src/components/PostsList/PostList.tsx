import { PostListDTO } from "@/types/post";

import PostCard from "../PostCard/PostCard";

import styles from "./PostList.module.css";

export default function PostsList({ posts }: { posts: PostListDTO[] }) {
  return (
    <div className={styles["posts-list"]}>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
