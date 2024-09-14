import banner from "assets/images/landing/banner.png";
import classNames from "classnames/bind";
import Button from "components/Button";
import { Link } from "react-router-dom";

import styles from "../Landing.module.scss";

const cx = classNames.bind(styles);

export default function Banner() {
  return (
    <div className={cx("banner-container")}>
      <div>
        <h1 className={cx("title")}>
          <span>일상의 모든 물건을 </span>
          <span>거래해 보세요</span>
        </h1>
        <div className={cx("button-wrapper")}>
          <Link to="/items">
            <Button type="button" round>
              구경하러가기
            </Button>
          </Link>
        </div>
      </div>

      <img src={banner} alt="banner" />
    </div>
  );
}
