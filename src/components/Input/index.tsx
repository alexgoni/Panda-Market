import { ChangeEvent, InputHTMLAttributes } from "react";

import EmailInput from "./EmailInput";
import NumberInput from "./NumberInput";
import PasswordInput from "./PasswordInput";
import SearchInput from "./SearchInput";
import TextInput from "./TextInput";

interface NumberInputProps extends InputHTMLAttributes<HTMLInputElement> {
  type: "number";
  value: number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  type: "search";
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  maxWidth?: string;
}

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  type?: "text" | "email" | "password";
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

type Props = NumberInputProps | TextInputProps | SearchInputProps;

export default function Input(props: Props) {
  const { onChange, type = "text" } = props;

  if (type === "number") {
    const { value } = props as NumberInputProps;
    return <NumberInput {...props} value={value} onChange={onChange} />;
  }

  if (type === "search") {
    const { value, maxWidth } = props as SearchInputProps;
    return (
      <SearchInput
        {...props}
        value={value}
        onChange={onChange}
        maxWidth={maxWidth}
      />
    );
  }

  const { value } = props as TextInputProps;

  if (type === "text") {
    return <TextInput {...props} value={value} onChange={onChange} />;
  }
  if (type === "email") {
    return <EmailInput {...props} value={value} onChange={onChange} />;
  }
  if (type === "password") {
    return <PasswordInput {...props} value={value} onChange={onChange} />;
  }

  return null;
}
