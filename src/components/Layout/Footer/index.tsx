import classNames from "classnames/bind";

import styles from "./Footer.module.scss";

const cx = classNames.bind(styles);

export default function Footer() {
  return (
    <footer className={cx("footer")}>
      <span>© created by alexgoni</span>
      <span>2024 Panda Market</span>
    </footer>
  );
}
