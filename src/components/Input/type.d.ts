import { ChangeEvent, InputHTMLAttributes } from "react";

export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  type: "text";
  value: string;
  name: string;
  required?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export interface NumberInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  type: "number";
  value: number;
  name: string;
  required?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export interface EmailInputProps extends InputHTMLAttributes<HTMLInputElement> {
  type: "email";
  value: string;
  name: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export interface PasswordInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  type: "password";
  value: string;
  name: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export interface PasswordConfirmationInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  type: "password-confirmation";
  value: string;
  name: string;
  password: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export interface SearchInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  type: "search";
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  maxWidth?: string;
}
