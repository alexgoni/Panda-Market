/* eslint-disable react/button-has-type */
import classNames from "classnames/bind";
import { ButtonHTMLAttributes } from "react";

import styles from "./Button.module.scss";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  round?: boolean;
  width?: string;
  height?: string;
}

const cn = classNames.bind(styles);

export default function Button({
  type = "button",
  children,
  round = false,
  disabled = false,
  width,
  height,
  onClick,
}: Props) {
  const classnames = cn("button", {
    round,
  });

  return (
    <button
      type={type}
      className={classnames}
      onClick={onClick}
      disabled={disabled}
      style={{ width, height }}
    >
      {children}
    </button>
  );
}
