import { ReactComponent as HeartIcon } from "assets/icons/ic_heart.svg";
import classNames from "classnames/bind";

import styles from "../../Product.module.scss";

const cx = classNames.bind(styles);

interface Props {
  favoriteCount: number;
  productId: number;
}

export default function LikeButton({ favoriteCount, productId }: Props) {
  return (
    <button type="button" className={cx("like-button")}>
      <HeartIcon width={24} height={24} strokeWidth={1} />
      {favoriteCount}
    </button>
  );
}
