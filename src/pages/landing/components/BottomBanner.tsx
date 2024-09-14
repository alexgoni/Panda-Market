import bottomBanner from "assets/images/landing/bottom_banner.png";
import classNames from "classnames/bind";

import styles from "../Landing.module.scss";

const cx = classNames.bind(styles);

export default function BottomBanner() {
  return (
    <div className={cx("bottom-banner-container")}>
      <h1>
        믿을 수 있는
        <br />
        판다마켓 중고 거래
      </h1>

      <img src={bottomBanner} alt="bottom-banner" />
    </div>
  );
}
