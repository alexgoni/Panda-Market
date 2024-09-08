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
    const { value, ...rest } = props as TextInputProps;
    return <TextInput {...rest} value={value} onChange={onChange} />;
  }

  if (type === "number") {
    const { value, ...rest } = props as NumberInputProps;
    return <NumberInput {...rest} value={value} onChange={onChange} />;
  }

  if (type === "email") {
    const { value, ...rest } = props as EmailInputProps;
    return <EmailInput {...rest} value={value} onChange={onChange} />;
  }

  if (type === "password") {
    const { value, ...rest } = props as PasswordInputProps;
    return <PasswordInput {...rest} value={value} onChange={onChange} />;
  }

  if (type === "password-confirmation") {
    const { value, password, ...rest } =
      props as PasswordConfirmationInputProps;
    return (
      <PasswordConfirmationInput
        {...rest}
        value={value}
        onChange={onChange}
        password={password}
      />
    );
  }

  if (type === "search") {
    const { value, maxWidth, ...rest } = props as SearchInputProps;
    return (
      <SearchInput
        {...rest}
        value={value}
        onChange={onChange}
        maxWidth={maxWidth}
      />
    );
  }

  return null;
}
