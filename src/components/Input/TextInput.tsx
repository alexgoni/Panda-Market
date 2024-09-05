import { ChangeEvent, InputHTMLAttributes } from "react";

import styles from "./Input.module.scss";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function TextInput(props: Props) {
  return <input type="text" className={styles.input} {...props} />;
}
