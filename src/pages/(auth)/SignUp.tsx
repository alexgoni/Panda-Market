import classNames from "classnames/bind";

import styles from "./Auth.module.scss";
import Information from "./components/Information";
import SignUpForm from "./components/SignUpForm";

const cx = classNames.bind(styles);

export default function SignUpPage() {
  return (
    <div className={cx("page")}>
      <div className={cx("container", "sign-up")}>
        <SignUpForm />
        <Information />
      </div>
    </div>
  );
}
