import { useFormContext } from "components/Form";
import React, { ChangeEvent, useEffect } from "react";

import styles from "./Input.module.scss";
import { NumberInputProps } from "./type";

type Props = Omit<NumberInputProps, "type">;

export default function NumberInput(props: Props) {
  const { required, name, onChange, value, ...rest } = props;
  const { handleValidationState } = useFormContext();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value.replace(/,/g, ""));

    if (!Number.isNaN(newValue) && newValue < Number.MAX_SAFE_INTEGER) {
      e.target.value = String(newValue);
      onChange(e);
    }
  };

  useEffect(() => {
    if (!required) return;

    if (value > 0) handleValidationState({ [name]: true });
    else handleValidationState({ [name]: false });
  }, [value, required]);

  return (
    <input
      {...rest}
      type="text"
      className={styles.input}
      required={required}
      name={name}
      value={value === 0 ? "" : value.toLocaleString()}
      onChange={handleChange}
    />
  );
}
