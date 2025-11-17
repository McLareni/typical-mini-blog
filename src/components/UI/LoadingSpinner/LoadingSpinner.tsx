import styles from "./LoadingSpinner.module.css";

export default function LoadingSpinner() {
  console.log("spinner");

  return (
    <div className={styles.overlay} role="status" aria-live="polite">
      <div className={styles.modal} aria-hidden="false">
        <div className={styles.spinner} />
        <p className={styles.text}>Loading...</p>
      </div>
    </div>
  );
}
