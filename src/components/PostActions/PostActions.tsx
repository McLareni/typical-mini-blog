"use client";

import Link from "next/link";
import { useRouter, useParams } from "next/navigation";

import styles from "./PostActions.module.css";

export default function PostActions() {
  const router = useRouter();
  const params = useParams();

  const deletePost = async () => {
    const response = await fetch(`/api/posts/${params.id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      router.push("/");
      router.refresh();
    }
  };

  return (
    <div className={styles.buttons}>
      <button>
        <Link href={`/post/${params.id}/edit`}>Edit</Link>
      </button>
      <button onClick={deletePost}>Delete</button>
    </div>
  );
}
