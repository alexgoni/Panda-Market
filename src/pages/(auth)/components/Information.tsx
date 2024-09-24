import classNames from "classnames/bind";
import { Link, useLocation } from "react-router-dom";

import styles from "../Auth.module.scss";

const cx = classNames.bind(styles);

export default function Information() {
  const { pathname } = useLocation();

  return (
    <div className={cx("information-container")}>
      {pathname === "/login" ? <LoginInformation /> : <SignUpInformation />}
    </div>
  );
}

function LoginInformation() {
  return (
    <>
      <h1>안녕하세요!</h1>
      <span>오늘도 쉽고 빠른 거래를 도와드릴게요 :)</span>

      <Link to="/sign-up">
        <button type="button" className={cx("link-button")}>
          회원가입
        </button>
      </Link>
    </>
  );
}

function SignUpInformation() {
  return (
    <>
      <h1>환영합니다!</h1>
      <span>판다마켓에서 더 똑똑한 소비를 경험해 보세요</span>

      <Link to="/login">
        <button type="button" className={cx("link-button")}>
          로그인
        </button>
      </Link>
    </>
  );
}
