import styles from "./FormInput.module.css";

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  id: string;
}

export default function FormInput({ label, id, ...props }: IProps) {
  return (
    <div className={styles.container}>
      {label && <label htmlFor={id}>{label}</label>}
      <input id={id} {...props} />
    </div>
  );
}
