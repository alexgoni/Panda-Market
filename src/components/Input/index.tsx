import EmailInput from "./EmailInput";
import NumberInput from "./NumberInput";
import PasswordConfirmationInput from "./PasswordConfirmationInput";
import PasswordInput from "./PasswordInput";
import SearchInput from "./SearchInput";
import TextInput from "./TextInput";
import {
  EmailInputProps,
  NumberInputProps,
  PasswordConfirmationInputProps,
  PasswordInputProps,
  SearchInputProps,
  TextInputProps,
} from "./type";

type Props =
  | TextInputProps
  | NumberInputProps
  | EmailInputProps
  | PasswordInputProps
  | PasswordConfirmationInputProps
  | SearchInputProps;

export default function Input(props: Props) {
  const { onChange, type } = props;

  if (type === "text") {
    const { value } = props as TextInputProps;
    return <TextInput {...props} value={value} onChange={onChange} />;
  }

  if (type === "number") {
    const { value } = props as NumberInputProps;
    return <NumberInput {...props} value={value} onChange={onChange} />;
  }

  if (type === "email") {
    const { value } = props as EmailInputProps;
    return <EmailInput {...props} value={value} onChange={onChange} />;
  }

  if (type === "password") {
    const { value } = props as PasswordInputProps;
    return <PasswordInput {...props} value={value} onChange={onChange} />;
  }

  if (type === "password-confirmation") {
    const { value, password } = props as PasswordConfirmationInputProps;
    return (
      <PasswordConfirmationInput
        {...props}
        value={value}
        onChange={onChange}
        password={password}
      />
    );
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

  return null;
}
