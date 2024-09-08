import passwordEyeOpen from "assets/icons/ic_password_eye-open.svg";
import passwordEyeClose from "assets/icons/ic_password_eye.svg";
import classNames from "classnames/bind";
import { useFormContext } from "components/Form";
import { ChangeEvent, useState } from "react";

import styles from "./Input.module.scss";
import { PasswordConfirmationInputProps } from "./type";

const cx = classNames.bind(styles);
const MIN_PASSWORD_LENGTH = 8;

type Props = Omit<PasswordConfirmationInputProps, "type">;

export default function PasswordConfirmationInput(props: Props) {
  const { name, onChange, password, ...rest } = props;
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { handleValidationState } = useFormContext();

  const togglePassword = () => {
    setPasswordOpen((prev) => !prev);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    if (newValue.trim() === "") {
      setError(null);
      handleValidationState({ [name]: false });
    } else if (newValue.length < MIN_PASSWORD_LENGTH) {
      setError("비밀번호를 8자 이상 입력해주세요.");
      handleValidationState({ [name]: false });
    } else if (newValue !== password) {
      setError("비밀번호가 일치하지 않습니다.");
      handleValidationState({ [name]: false });
    } else {
      setError(null);
      handleValidationState({ [name]: true });
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
          {...rest}
          type={passwordOpen ? "text" : "password"}
          name={name}
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
