import { useFormContext } from "components/Form";
import React, { ChangeEvent } from "react";

import styles from "./Input.module.scss";
import { NumberInputProps } from "./type";

type Props = Omit<NumberInputProps, "type">;

export default function NumberInput(props: Props) {
  const { required, name, onChange, value } = props;
  const { setValidationState } = useFormContext();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value.replace(/,/g, ""));

    if (required) {
      if (!Number.isNaN(newValue) && newValue !== 0) {
        setValidationState({ [name]: true });
      } else setValidationState({ [name]: false });
    }

    if (!Number.isNaN(newValue) && newValue < Number.MAX_SAFE_INTEGER) {
      e.target.value = String(newValue);
      onChange(e);
    }
  };

  return (
    <input
      {...props}
      type="text"
      className={styles.input}
      value={value === 0 ? "" : value.toLocaleString()}
      onChange={handleChange}
    />
  );
}
