import Link from "next/link";

import styles from "./header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <Link className={styles.baseLink} href="/">
        Home
      </Link>
      <Link className={styles.profile} href="/login">
        Login
      </Link>
    </header>
  );
}
