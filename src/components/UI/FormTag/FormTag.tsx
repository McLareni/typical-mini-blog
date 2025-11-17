import styles from "./FormTag.module.css";

interface IProps {
  tag: string;
  active: boolean;
  onClick?: () => void;
}

export default function FormTag({ tag, active, onClick }: IProps) {
  return (
    <button
      key={tag}
      className={active ? `${styles.tag} ${styles.active}` : styles.tag}
      type="button"
      onClick={onClick}
    >
      {tag}
    </button>
  );
}
