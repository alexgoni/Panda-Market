import classNames from "classnames/bind";
import { useFormContext } from "components/Form";
import { ChangeEvent, useState } from "react";

import styles from "./Input.module.scss";
import { EmailInputProps } from "./type";

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const cx = classNames.bind(styles);

type Props = Omit<EmailInputProps, "type">;

export default function EmailInput(props: Props) {
  const { onChange, name } = props;
  const [error, setError] = useState<string | null>(null);
  const { setValidationState } = useFormContext();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    if (newValue.trim() === "") {
      setError(null);
      setValidationState({ [name]: false });
    } else if (!validateEmail(newValue)) {
      setError("유효하지 않은 이메일 형식입니다.");
      setValidationState({ [name]: false });
    } else {
      setError(null);
      setValidationState({ [name]: true });
    }

    onChange(e);
  };

  const inputClassnames = cx("input", {
    error,
  });

  return (
    <>
      <input
        {...props}
        type="email"
        className={inputClassnames}
        onChange={handleChange}
      />
      {error && <span className={cx("error-msg")}>{error}</span>}
    </>
  );
}
