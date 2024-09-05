import passwordEyeOpen from "assets/icons/ic_password_eye-open.svg";
import passwordEyeClose from "assets/icons/ic_password_eye.svg";
import classNames from "classnames/bind";
import { ChangeEvent, InputHTMLAttributes, useState } from "react";

import styles from "./Input.module.scss";

const cn = classNames.bind(styles);

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function PasswordInput(props: Props) {
  const { value } = props;
  const [passwordOpen, setPasswordOpen] = useState(false);

  const togglePassword = () => {
    setPasswordOpen((prev) => !prev);
  };

  const isError = (value as string).length > 10;

  const inputClassnames = cn("input", "password", {
    error: isError,
  });

  return (
    <>
      <div className={styles.passwordWrapper}>
        <input
          type={passwordOpen ? "text" : "password"}
          className={inputClassnames}
          {...props}
        />
        <button type="button" onClick={togglePassword}>
          {passwordOpen ? (
            <img src={passwordEyeOpen} alt="pw-open" />
          ) : (
            <img src={passwordEyeClose} alt="pw-close" />
          )}
        </button>
      </div>

      {isError && (
        <span className={styles.errorMsg}>
          비밀번호를 8자 이상 입력해주세요
        </span>
      )}
    </>
  );
}
