import searchIcon from "assets/icons/ic_search.svg";
import classNames from "classnames/bind";

import styles from "./Input.module.scss";
import { SearchInputProps } from "./type";

const cx = classNames.bind(styles);

type Props = Omit<SearchInputProps, "type">;

export default function SearchInput(props: Props) {
  const { maxWidth, ...rest } = props;

  return (
    <div className={cx("search-input-wrapper")} style={{ maxWidth }}>
      <input {...rest} type="text" />
      <img src={searchIcon} alt="search" />
    </div>
  );
}
