"use client";

import Link from "next/link";

import { useUser } from "@/context/userContext";

import styles from "./header.module.css";

export default function Header() {
  const { user } = useUser();


  return (
    <header className={styles.header}>
      <Link className={styles.baseLink} href="/">
        Home
      </Link>
      {user?.accessToken ? (
        <Link className={styles.right} href="/profile">Profile</Link>
      ) : (
        <Link className={styles.right} href="/login">
          Login
        </Link>
      )}
    </header>
  );
}
