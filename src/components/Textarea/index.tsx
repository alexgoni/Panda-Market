import classNames from "classnames/bind";
import { useFormContext } from "components/Form";
import { ChangeEvent, TextareaHTMLAttributes, useEffect } from "react";

import styles from "./Textarea.module.scss";

const cx = classNames.bind(styles);

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  value: string;
  name: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  size?: "sm" | "md";
}

export default function Textarea(props: Props) {
  const { size = "md", name, required, onChange, value, ...rest } = props;
  const { handleValidationState } = useFormContext();

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (required) {
      const newValue = e.target.value;

      if (newValue.length === 0) handleValidationState({ [name]: false });
      else handleValidationState({ [name]: true });
    }

    onChange(e);
  };

  const classnames = cx("textarea", {
    sm: size === "sm",
  });

  useEffect(() => {
    if (required && value.length > 0) handleValidationState({ [name]: true });
  }, [value, required, name]);

  return (
    <textarea
      {...rest}
      value={value}
      name={name}
      required={required}
      onChange={handleChange}
      className={classnames}
    />
  );
}
