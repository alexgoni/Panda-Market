import { useFormContext } from "components/Form";
import { ChangeEvent, useEffect } from "react";

import styles from "./Input.module.scss";
import { TextInputProps } from "./type";

type Props = Omit<TextInputProps, "type">;

export default function TextInput(props: Props) {
  const { required, name, onChange, value, ...rest } = props;
  const { handleValidationState } = useFormContext();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (required) {
      const newValue = e.target.value;

      if (newValue.length === 0) handleValidationState({ [name]: false });
      else handleValidationState({ [name]: true });
    }

    onChange(e);
  };

  useEffect(() => {
    if (required && value.length > 0) handleValidationState({ [name]: true });
  }, [value, required, name]);

  return (
    <input
      {...rest}
      value={value}
      type="text"
      className={styles.input}
      name={name}
      required={required}
      onChange={handleChange}
    />
  );
}
