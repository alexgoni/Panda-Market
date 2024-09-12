/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

/* eslint-disable jsx-a11y/click-events-have-key-events */
import classNames from "classnames/bind";
import { ReactNode } from "react";

import styles from "./Dropdown.module.scss";

const cx = classNames.bind(styles);

interface Props {
  children: ReactNode;
  onClick: () => void;
}

export default function Option({ children, onClick }: Props) {
  return (
    <li className={cx("option")} onClick={onClick}>
      {children}
    </li>
  );
}
