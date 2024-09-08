import passwordEyeOpen from "assets/icons/ic_password_eye-open.svg";
import passwordEyeClose from "assets/icons/ic_password_eye.svg";
import classNames from "classnames/bind";
import { useFormContext } from "components/Form";
import { ChangeEvent, useState } from "react";

import styles from "./Input.module.scss";
import { PasswordConfirmationInputProps } from "./type";

const cn = classNames.bind(styles);
const MIN_PASSWORD_LENGTH = 8;

type Props = Omit<PasswordConfirmationInputProps, "type">;

export default function PasswordConfirmationInput(props: Props) {
  const { name, onChange, password } = props;
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setValidationState } = useFormContext();

  const togglePassword = () => {
    setPasswordOpen((prev) => !prev);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    if (newValue.trim() === "") {
      setError(null);
      setValidationState({ [name]: false });
    } else if (newValue.length < MIN_PASSWORD_LENGTH) {
      setError("비밀번호를 8자 이상 입력해주세요.");
      setValidationState({ [name]: false });
    } else if (newValue !== password) {
      setError("비밀번호가 일치하지 않습니다.");
      setValidationState({ [name]: false });
    } else {
      setError(null);
      setValidationState({ [name]: true });
    }

    onChange(e);
  };
  const inputClassnames = cn("input", "password", {
    [styles.error]: !!error,
  });

  return (
    <>
      <div className={styles.passwordWrapper}>
        <input
          {...props}
          type={passwordOpen ? "text" : "password"}
          className={inputClassnames}
          onChange={handleChange}
        />
        <button
          type="button"
          onClick={togglePassword}
          className={styles.eyeIcon}
        >
          {passwordOpen ? (
            <img src={passwordEyeOpen} alt="pw-open" />
          ) : (
            <img src={passwordEyeClose} alt="pw-close" />
          )}
        </button>
      </div>

      {error && <span className={styles.errorMsg}>{error}</span>}
    </>
  );
}
