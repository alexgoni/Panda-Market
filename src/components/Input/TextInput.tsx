import { useFormContext } from "components/Form";
import { ChangeEvent } from "react";

import styles from "./Input.module.scss";
import { TextInputProps } from "./type";

type Props = Omit<TextInputProps, "type">;

export default function TextInput(props: Props) {
  const { required, name, onChange } = props;
  const { setValidationState } = useFormContext();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (required) {
      const newValue = e.target.value;

      if (newValue.length === 0) setValidationState({ [name]: false });
      else setValidationState({ [name]: true });
    }

    onChange(e);
  };

  return (
    <input
      {...props}
      type="text"
      className={styles.input}
      onChange={handleChange}
    />
  );
}