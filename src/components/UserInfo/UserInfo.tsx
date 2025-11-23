"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useUser } from "@/context/userContext";
import { UserDTO } from "@/types/user";
import { formatterDate } from "@/utils/function/formatterDate";

import PostListProfile from "../PostListProfile/PostListProfile";

import styles from "./UserInfo.module.css";

export function UserInfo() {
  const [fullInfo, setFullInfo] = useState<UserDTO>();
  const { user, setUser, setUserLoaded } = useUser();
  const router = useRouter();

  const formattedDate = formatterDate("ONLY_DATE", fullInfo?.createdAt);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/user/${user?.id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
        },
      });

      const userInfo: UserDTO = await res.json();
      if (user) {
        setFullInfo(userInfo);
      }
    };

    if (user?.id) {
      fetchData();
    }
  }, [user]);

  const logout = () => {
    setUser(null);
    setUserLoaded(true);
    router.push("/");
  };

  return (
    <div className={styles.page}>
      <div className={styles["main-info"]}>
        <div className={styles.info}>
          <h3>Name: {fullInfo?.name}</h3>
          <p>Email: {fullInfo?.email}</p>
          <p>With us: {formattedDate}</p>
        </div>
        <div>
          <button onClick={logout}>Logout</button>
        </div>
      </div>

      <PostListProfile posts={fullInfo?.posts || []} />
    </div>
  );
}
