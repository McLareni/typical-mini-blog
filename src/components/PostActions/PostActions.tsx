"use client";

import Link from "next/link";
import { useRouter, useParams } from "next/navigation";

import { useUser } from "@/context/userContext";

import styles from "./PostActions.module.css";

interface IProps {
  authorId: number;
}

export default function PostActions({ authorId }: IProps) {
  const router = useRouter();
  const params = useParams();
  const { user } = useUser();

  const deletePost = async () => {
    const response = await fetch(`/api/posts/${params.id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      router.push("/");
      router.refresh();
    }
  };

  if (authorId !== user?.id) {
    return null;
  }

  return (
    <div className={styles.buttons}>
      <button>
        <Link href={`/post/${params.id}/edit`}>Edit</Link>
      </button>
      <button onClick={deletePost}>Delete</button>
    </div>
  );
}
