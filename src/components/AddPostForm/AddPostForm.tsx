"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { PostDetailDTO } from "@/types/post";
import { POST_TAGS } from "@/utils/Constants/Post";
import { validateNewPost } from "@/utils/validation/newPostValidation";

import FormInput from "../UI/FormInput.tsx/FormInput";
import FormTag from "../UI/FormTag/FormTag";

import styles from "./AddPostform.module.css";

interface IProps {
  defaultvalues?: PostDetailDTO;
}

export default function Form({ defaultvalues }: IProps) {
  const [title, setTitle] = useState<string>(defaultvalues?.title || "");
  const [content, setContent] = useState<string>(defaultvalues?.content || "");
  const [tags, setTags] = useState<string[]>(defaultvalues?.tags || []);
  const router = useRouter();

  const isEdit = Boolean(defaultvalues);

  const addTag = (tag: string) => {
    if (!tags.includes(tag)) {
      setTags([...tags, tag]);
    } else {
      setTags(tags.filter((t) => t !== tag));
    }
  };

  const createPost = async (e: React.FocusEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validation = validateNewPost(title, content);

    if (validation.valid) {
      try {
        await fetch("/api/posts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, content, tags }),
        });

        router.refresh();
        setTitle("");
        setContent("");
        setTags([]);
      } finally {
      }
    } else {
      alert(`${validation.error}`);
    }
  };

  const editPost = async (e: React.FocusEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validation = validateNewPost(title, content);

    if (validation.valid) {
      try {
        await fetch(`/api/posts/${defaultvalues?.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, content, tags }),
        });

        router.push("/post/" + defaultvalues?.id);
      } finally {
      }
    } else {
      alert(`${validation.error}`);
    }
  };

  return (
    <>
      <form onSubmit={isEdit ? editPost : createPost} className={styles.form}>
        <div className={styles.inputs}>
          <FormInput
            label="Title"
            type="text"
            value={title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setTitle(e.target.value);
            }}
            id="postTitle"
          />
          <FormInput
            label="Content"
            value={content}
            type="text"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setContent(e.target.value);
            }}
            id="postContent"
          />
        </div>
        <div className={styles.tags}>
          {POST_TAGS.map((tag) => (
            <FormTag
              key={tag}
              tag={tag}
              active={tags.includes(tag)}
              onClick={() => addTag(tag)}
            />
          ))}
        </div>
        <button type="submit">{isEdit ? "Edit post" : "Add post"}</button>
      </form>
    </>
  );
}
