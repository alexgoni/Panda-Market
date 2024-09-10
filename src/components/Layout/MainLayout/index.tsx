import classNames from "classnames/bind";
import { ReactNode } from "react";

import styles from "./MainLayout.module.scss";

const cx = classNames.bind(styles);

export default function MainLayout({ children }: { children: ReactNode }) {
  return <main className={cx("main-layout")}>{children}</main>;
}
