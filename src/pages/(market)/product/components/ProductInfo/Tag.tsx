import classNames from "classnames/bind";
import { ReactNode } from "react";

import styles from "../../Product.module.scss";

const cx = classNames.bind(styles);

export default function Tag({ children }: { children: ReactNode }) {
  return <div className={cx("tag")}>{children}</div>;
}
