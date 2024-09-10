import mainLogo from "assets/icons/ic_main_logo.svg";
import mobileMainLogo from "assets/icons/ic_main_logo_mobile.svg";
import classNames from "classnames/bind";
import Button from "components/Button";
import useMediaQuery, { MOBILE_WIDTH } from "hooks/useMediaQuery";
import { NavLink } from "react-router-dom";

import styles from "./Navbar.module.scss";

const cx = classNames.bind(styles);

export default function Navbar() {
  const isMobile = useMediaQuery(MOBILE_WIDTH);

  return (
    <nav className={cx("navbar")}>
      <NavLink to="/">
        {isMobile ? (
          <img src={mobileMainLogo} alt="main-logo" />
        ) : (
          <img src={mainLogo} alt="main-logo" />
        )}
      </NavLink>
      <div className={cx("menus")}>
        <NavLink
          to="/board"
          className={({ isActive }) => (isActive ? cx("active") : "")}
        >
          자유게시판
        </NavLink>
        <NavLink
          to="/market"
          className={({ isActive }) => (isActive ? cx("active") : "")}
        >
          중고마켓
        </NavLink>
      </div>

      <NavLink to="/login">
        <Button type="button">로그인</Button>
      </NavLink>
    </nav>
  );
}
