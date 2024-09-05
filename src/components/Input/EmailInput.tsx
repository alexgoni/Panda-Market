import classNames from "classnames/bind";
import { ChangeEvent, InputHTMLAttributes } from "react";

import styles from "./Input.module.scss";

const cn = classNames.bind(styles);

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function EmailInput(props: Props) {
  const { value } = props;
  const isError = value.length > 10;

  const inputClassnames = cn("input", {
    error: isError,
  });

  return (
    <>
      <input type="email" className={inputClassnames} {...props} />
      {isError && <span className={styles.errorMsg}>잘못된 이메일입니다.</span>}
    </>
  );
}
