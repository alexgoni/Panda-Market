import passwordEyeOpen from "assets/icons/ic_password_eye-open.svg";
import passwordEyeClose from "assets/icons/ic_password_eye.svg";
import classNames from "classnames/bind";
import { useFormContext } from "components/Form";
import { ChangeEvent, useState } from "react";

import styles from "./Input.module.scss";
import { PasswordInputProps } from "./type";

const cx = classNames.bind(styles);
const MIN_PASSWORD_LENGTH = 8;

type Props = Omit<PasswordInputProps, "type">;

export default function PasswordInput(props: Props) {
  const { name, onChange } = props;
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
    } else {
      setError(null);
      setValidationState({ [name]: true });
    }

    onChange(e);
  };

  const inputClassnames = cx("input", "password", {
    error,
  });

  return (
    <>
      <div className={cx("password-wrapper")}>
        <input
          {...props}
          type={passwordOpen ? "text" : "password"}
          className={inputClassnames}
          onChange={handleChange}
        />
        <button
          type="button"
          onClick={togglePassword}
          className={cx("eye-icon")}
        >
          {passwordOpen ? (
            <img src={passwordEyeOpen} alt="pw-open" />
          ) : (
            <img src={passwordEyeClose} alt="pw-close" />
          )}
        </button>
      </div>

      {error && <span className={cx("error-msg")}>{error}</span>}
    </>
  );
}
