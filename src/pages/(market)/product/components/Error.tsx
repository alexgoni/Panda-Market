import classNames from "classnames/bind";

import styles from "../Product.module.scss";

const cx = classNames.bind(styles);

export default function Error() {
  return <div className={cx("error")}>에러가 발생했습니다.</div>;
}
