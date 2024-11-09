import classNames from "classnames/bind";
import { ReactNode } from "react";

import styles from "../../Market.module.scss";

const cx = classNames.bind(styles);

export default function DataContainer({ children }: { children: ReactNode }) {
  return <div className={cx("best-products-container")}>{children}</div>;
}
