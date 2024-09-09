/* eslint-disable @typescript-eslint/no-shadow */
import EmailInput from "./EmailInput";
import NumberInput from "./NumberInput";
import PasswordConfirmationInput from "./PasswordConfirmationInput";
import PasswordInput from "./PasswordInput";
import SearchInput from "./SearchInput";
import TagInput from "./TagInput";
import TextInput from "./TextInput";
import type {
  EmailInputProps,
  NumberInputProps,
  PasswordConfirmationInputProps,
  PasswordInputProps,
  SearchInputProps,
  TagInputProps,
  TextInputProps,
} from "./type";

type Props =
  | TextInputProps
  | NumberInputProps
  | EmailInputProps
  | PasswordInputProps
  | PasswordConfirmationInputProps
  | TagInputProps
  | SearchInputProps;

export default function Input(props: Props) {
  const { type } = props;

  if (type === "text") {
    const { type, ...rest } = props as TextInputProps;
    return <TextInput {...rest} />;
  }

  if (type === "number") {
    const { type, ...rest } = props as NumberInputProps;
    return <NumberInput {...rest} />;
  }

  if (type === "email") {
    const { type, ...rest } = props as EmailInputProps;
    return <EmailInput {...rest} />;
  }

  if (type === "password") {
    const { type, ...rest } = props as PasswordInputProps;
    return <PasswordInput {...rest} />;
  }

  if (type === "password-confirmation") {
    const { type, ...rest } = props as PasswordConfirmationInputProps;
    return <PasswordConfirmationInput {...rest} />;
  }

  if (type === "tag") {
    const { type, ...rest } = props as TagInputProps;
    return <TagInput {...rest} />;
  }

  if (type === "search") {
    const { type, ...rest } = props as SearchInputProps;
    return <SearchInput {...rest} />;
  }

  return null;
}
