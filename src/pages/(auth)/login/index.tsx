import classNames from "classnames/bind";

import styles from "../Auth.module.scss";
import Information from "../components/Information";
import LoginForm from "../components/LoginForm";

const cx = classNames.bind(styles);

export default function LoginPage() {
  return (
    <div className={cx("page")}>
      <div className={cx("container", "login")}>
        <Information />
        <LoginForm />
      </div>
    </div>
  );
}
