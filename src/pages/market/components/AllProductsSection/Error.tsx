import classNames from "classnames/bind";

import styles from "../../Market.module.scss";

const cx = classNames.bind(styles);

export default function Error() {
  return <h1 className={cx("all-products-error")}>에러가 발생했습니다.</h1>;
}
