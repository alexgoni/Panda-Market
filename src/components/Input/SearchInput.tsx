import searchIcon from "assets/icons/ic_search.svg";
import { ChangeEvent, InputHTMLAttributes } from "react";

import styles from "./Input.module.scss";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  maxWidth?: string;
}

export default function SearchInput(props: Props) {
  const { maxWidth } = props;

  return (
    <div className={styles.searchInputWrapper} style={{ maxWidth }}>
      <input type="text" className={styles.searchInput} {...props} />
      <img src={searchIcon} alt="search" />
    </div>
  );
}
