import React, { ChangeEvent, InputHTMLAttributes } from "react";

import styles from "./Input.module.scss";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  value: number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function NumberInput({ value, onChange, ...props }: Props) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value.replace(/,/g, ""));

    if (!Number.isNaN(newValue) && newValue < Number.MAX_SAFE_INTEGER) {
      e.target.value = String(newValue);
      onChange?.(e);
    }
  };

  return (
    <input
      type="text"
      className={styles.input}
      {...props}
      value={value === 0 ? "" : value.toLocaleString()}
      onChange={handleChange}
    />
  );
}
