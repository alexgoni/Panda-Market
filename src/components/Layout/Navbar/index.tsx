import { useQuery } from "@tanstack/react-query";
import { getMyInfo } from "api/user";
import mainLogo from "assets/icons/ic_main_logo.svg";
import mobileMainLogo from "assets/icons/ic_main_logo_mobile.svg";
import classNames from "classnames/bind";
import Button from "components/Button";
import Popover from "components/Popover";
import Profile from "components/Profile";
import { useUserContext } from "context/user";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { getCookie } from "utils/cookie";
import { ACCESS_TOKEN_TIME } from "utils/cookie/variables";

import styles from "./Navbar.module.scss";

const cx = classNames.bind(styles);

export default function Navbar() {
  const refreshToken = getCookie("refreshToken");
  const { userInfo, setUserInfo } = useUserContext();
  const { data, isLoading } = useQuery({
    queryKey: ["my-info"],
    queryFn: getMyInfo,
    enabled: !userInfo && !!refreshToken,
    staleTime: ACCESS_TOKEN_TIME,
  });

  useEffect(() => {
    if (userInfo) return;
    if (data) setUserInfo(data);
  }, [data, userInfo]);

  return (
    <nav className={cx("navbar")}>
      <NavLink to="/">
        <img src={mainLogo} alt="main-logo" className={cx("main-logo")} />
        <img
          src={mobileMainLogo}
          alt="main-logo"
          className={cx("mobile-main-logo")}
        />
      </NavLink>
      <div className={cx("menus")}>
        <NavLink
          to="/market"
          className={({ isActive }) => (isActive ? cx("active") : "")}
        >
          중고마켓
        </NavLink>
      </div>

      {!isLoading &&
        (refreshToken && userInfo ? (
          <Popover.Root>
            <Popover.Trigger>
              <Profile name={userInfo.nickname} image={userInfo.image} />
            </Popover.Trigger>

            <Popover.Content position="right" top={12}>
              <ul className={cx("popover-content")}>
                <li>마이페이지</li>
                <li>로그아웃</li>
              </ul>
            </Popover.Content>
          </Popover.Root>
        ) : (
          <NavLink to="/login">
            <Button type="button">로그인</Button>
          </NavLink>
        ))}
    </nav>
  );
}
