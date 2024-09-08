import searchIcon from "assets/icons/ic_search.svg";

import styles from "./Input.module.scss";
import { SearchInputProps } from "./type";

type Props = Omit<SearchInputProps, "type">;

export default function SearchInput(props: Props) {
  const { maxWidth } = props;

  return (
    <div className={styles.searchInputWrapper} style={{ maxWidth }}>
      <input {...props} type="text" className={styles.searchInput} />
      <img src={searchIcon} alt="search" />
    </div>
  );
}
