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
  const { onChange, name, ...rest } = props;
  const [error, setError] = useState<string | null>(null);
  const { handleValidationState } = useFormContext();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    if (newValue.trim() === "") {
      setError(null);
      handleValidationState({ [name]: false });
    } else if (!validateEmail(newValue)) {
      setError("유효하지 않은 이메일 형식입니다.");
      handleValidationState({ [name]: false });
    } else {
      setError(null);
      handleValidationState({ [name]: true });
    }

    onChange(e);
  };

  const inputClassnames = cx("input", {
    error,
  });

  return (
    <>
      <input
        {...rest}
        type="email"
        className={inputClassnames}
        name={name}
        onChange={handleChange}
      />
      {error && <span className={cx("error-msg")}>{error}</span>}
    </>
  );
}
